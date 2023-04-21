const mongoose = require("mongoose");

const myInterest = new mongoose.Schema({
    _id: { type: String, required: true },
    userId: { type: String, required: true },
    interests: { type: Array, required: false }
});

module.exports = mongoose.model("MyInterest", myInterest);