const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require("mongoose")
var password = encodeURIComponent("Lordganesh@1234")
let database;
const uri = `mongodb+srv://vinayreddy:${password}@vinay.ztri9vu.mongodb.net/vinay?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = { client }