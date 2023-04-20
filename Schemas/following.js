const mongoose = require("mongoose");

const followingSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    followerId: { type: String, required: true },
    followingId: { type: String, required: true },

});

module.exports = mongoose.model("Following", followingSchema);