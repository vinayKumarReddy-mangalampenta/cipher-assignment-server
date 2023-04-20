const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const { client } = require("./Database/db")


// *server initialization  properties and environment configuration
const App = express()
App.use(express.json())
App.use(cors())
dotenv.config()


const authRoute = require("./Apis/Authentication/routes")
const profileRoute = require("./Apis/Profile/routes")




const connectToDb = async () => {
    try {
        await client.connect();
        await client.db("admin").command({ ping: 1 });

        console.log("Pinged your deployment. You successfully connected to MongoDB!");

        App.listen(process.env.PORT || 8000, () => {
            console.log(`server started on ${process.env.PORT || 8000}.`);
        });

    } catch (error) {
        console.log("Unable to connect to mongo db", error);
        process.exit(1);
    }
}

process.on("SIGINT", () => {
    console.log("Closing the MongoDB connection...");
    client.close(() => {
        console.log("MongoDB connection closed.");
        process.exit(0);
    });

    console.log("server has been stopped")
});

connectToDb()









App.get("/", async (req, res) => {
    try {
        const database = client.db("vinay");
        const users = database.collection("users");
        const user = await users.findOne({});
        console.log(user)
        res.send(user);
    } catch (error) {
        console.log("Error while reading data from database", error);
        res.status(500).send("Error while reading data from database");
    }

})


App.use("/Auth", authRoute)
App.use("/profile", profileRoute)





