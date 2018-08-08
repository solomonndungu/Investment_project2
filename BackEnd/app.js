var express = require("express");
var path = require("path");
var MongoClient = require("mongoose");
var bodyParser = require("body-parser");
var cons = require('consolidate');
var app = express();
var passport = require("passport");//unobtrusive authentication for Node.js
var LocalStrategy = require("passport-local");
var cookieParser = require("cookie-parser");
var flash = require("connect-flash");

var ClientDetails = require("./models/user");


app.engine('html', cons.swig)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
    res.render("index");
});

app.get("/register", function(req, res) {
    res.render("register")
});

app.get("/login", function(req, res) {
    res.render("login")
});

app.get("/learning", function(req, res) {
    res.render("learning")
});

MongoClient.Promise = global.Promise;
MongoClient.connect("mongodb://localhost:27017/back_end", { useNewUrlParser: true })
    .then(() => console.log(`Client Database connected`))
    .catch(err => console.log(`Oops! Check your MongoDB connection: ${err.message}`));


app.post("/register", function(req, res) {
    var newClient = new ClientDetails({
        name: req.body.name,
        id: req.body.id,
        email: req.body.email,
        password: req.body.password,
        password_repeat: req.body.password_repeat
    });
    
    ClientDetails.register(newClient, function(err, user) {
        if(err){
            console.log(err);
            return res.render("register", {error: err.message});
        }
        passport.authenticate("local")(req, res, function() {
            req.flash("success", "Successfully signed up! Start Investing!" + req.body.username);
            res.redirect("stocks");
        });
    });
});

app.get("login", function(req, res) {
    res.render("login", {page: 'login'});
});


app.listen(3000, function(){
    console.log("Server has started");
});