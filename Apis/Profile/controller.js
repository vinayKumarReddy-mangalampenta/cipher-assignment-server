const { client } = require("../../Database/db")
const following = require("../../Schemas/following")
const Profile = require("../../Schemas/profile")


const getProfile = async (req, res) => {
    try {
        const userProfile = await Profile.findOne({ id: req.id })
        const followersCount = await following.countDocuments({ id: req.id })
        res.send({ userProfile, followersCount })
    }
    catch (error) {
        console.log(error)
        res.send({ error })
    }

}



module.exports = { getProfile }