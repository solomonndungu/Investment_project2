var MongoClient = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");//Simplifies building username and password login with Passport

var clientDetailsSchema = new MongoClient.Schema({
    name:{
        type:String,
        required: [true, "Enter your two names"]
    },
    id: {
        type:String,
        required: [true,"Enter your national ID"]
},
    email: {
        type:String,
        required: [true, "The email field is required"]
},
    password: {
        type:String,
        required: [true, "Enter your password"]
    },
    password_repeat: {
        type: String,
        required: [true, "Enter the previous password that you just inserted"]
}
});

clientDetailsSchema.plugin(passportLocalMongoose);

var ClientDetails = MongoClient.model("ClientDetails", clientDetailsSchema);

module.exports = ClientDetails;