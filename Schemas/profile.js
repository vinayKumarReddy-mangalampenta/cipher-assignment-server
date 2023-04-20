const mongoose = require("mongoose");
const { client } = require("../Database/db")
const { MongoClient } = require('mongodb');

const profileSchema = new mongoose.Schema({
    id: { type: String, required: true },
    userName: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    aboutMe: { type: String, required: false },
    gender: { type: String, required: false },
    linkedIn: { type: String, required: false },
    facebook: { type: String, required: false },
    github: { type: String, required: false },
    twitter: { type: String, required: false },
    instagram: { type: String, required: false },
    website: { type: String, required: false },
    highestEducation: { type: String, required: false },
    currentPosition: { type: String, required: false },
    // followersCount: { type: Number, required: false },
});

module.exports = mongoose.model("Profile", profileSchema);