const mongoose = require("mongoose");

const interestsSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    value: { type: String, required: true },
});

module.exports = mongoose.model("Interests", interestsSchema);

