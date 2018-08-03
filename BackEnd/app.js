var express = require("express");
var path = require("path");
var mongoose = require("mongoose");
var app = express();
var port = 3000;

app.use("/register", (req, res) => {
    res.sendFile(path.join(__dirname, '../register.html'));
});

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/Back-End");

var clientDetailsSchema = new mongoose.Schema({
    name: String,
    id: String,
    email: String,
    password: String,
    password_repeat: String
});

var clientDetails = mongoose.model("clientDetails", clientDetailsSchema);

app.listen(port, () => {
    console.log("Server listening on port " + port);
});