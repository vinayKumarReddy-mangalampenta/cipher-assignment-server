const { client } = require("../../Database/db")
const uuid = require("uuid")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const Profile = require("../../Schemas/profile")

const login = async (req, res) => {
    const { email, password } = req.body

    const database = client.db("vinay");
    const users = database.collection("users");

    const user = await users.findOne({ email })
    if (!user) {
        res.status(400);
        res.send("Invalid User");
    } else {
        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (isPasswordMatched === true) {
            const payload = {
                username: user.username,
                id: user._id
            };
            const jwtToken = jwt.sign(payload, "MY_SECRET_TOKEN");
            res.send({ jwtToken, username: user.username });
        } else {
            res.status(400);
            res.send("Invalid Password");
        }
    }

}


const register = async (req, res) => {

    const { firstName, username, lastName, password, email } = req.body

    // encrypting the password
    const hashedPassword = await bcrypt.hash(password, 10);
    let newUserId = uuid.v4()

    const doc = { _id: newUserId, username, firstName, lastName, password: hashedPassword, email }

    try {
        const database = client.db("vinay");
        const users = database.collection("users");

        //  check for whether user exists with the given username already 
        let user = await users.findOne({ "username": username })
        if (user) {
            res.status(404).send(`User with username '${username}' already exists.`);
            return
        }
        user = await users.findOne({ "email": email })
        if (user) {
            res.status(404).send(`email address already exists.`);
            return
        }
        if (password.length < 6) {
            res.status(401).status("password too short")
        }

        const newUser = await users.insertOne(doc)
        createProfile({ id: newUserId, username, firstName, email, lastName, aboutMe: "", gender: "Male", linkedIn: "", facebook: "", github: "", twitter: "", instagram: "", website: "", highestEducation: "Graduation", currentPosition: "College Student" }
        )
        res.send({ response: "user created successfully" })
    }
    catch (error) {
        res.send("unable to create account")
    }

}


const createProfile = async (user = defaultUserProfile) => {
    const database = client.db("vinay");
    const newProfile = new Profile(user)
    console.log(user)
    try {
        newProfile.save()
        console.log("Profile Saved......")
    } catch (error) {
        console.error('Error saving profile:', error);
    }

}



module.exports = { login, register }