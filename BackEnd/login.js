var express = require("express");
var MongoClient = require("mongoose");
var bodyParser = require("body-parser");

var app = express();

app.get("/login", function(req, res) {
    res.render("../login.html")
});

