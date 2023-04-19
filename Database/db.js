const { MongoClient, ServerApiVersion } = require('mongodb');
var password = encodeURIComponent("Lordganesh@1234")
let database;
const uri = `mongodb+srv://vinayreddy:${password}@vinay.ztri9vu.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


module.exports = { client }

/*

 ? SCHEMAS

 user = {
 username ,
 firstname,
 lastname,
 email, 
 password
 } 


 profile = {
 firstName,
 lastName,
 About me, 
 gender;
 linkedIn,
 facebook,
 github,
 twitter,
 instagram,
 website,
 highestEducation,
 currentPosition

 }
 





*/