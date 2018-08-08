var express = require("express");
var path = require("path");
var mongoose = require("mongoose");
var bodyParser = require('body-parser');
var app = express();
var port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

app.post("/addedDetails", (req, res) => {
    var myData = new clientDetails(req.body);
    myData.save()
        .then(Details => {
            res.send("Details saved to database");
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
});

app.listen(port, () => {
    console.log("Server listening on port " + port);
});