var express = require("express");//helps in routing or navigating pages
var path = require("path");//allows one to navigate to local files and read them
var MongoClient = require("mongoose");//object modeling tool designed to work in asynchronous environment
var bodyParser = require("body-parser");//parse incoming requests or look into components of request 
var cons = require('consolidate');//template engine consolidation library...allows html to be displayed after loading of server
var app = express();
var passport = require("passport");//unobtrusive authentication for Node.js...allows user to first authenticate their details
var LocalStrategy = require("passport-local");//lets you authenticate using a username and password using Passport
var cookieParser = require("cookie-parser");
var flash = require("connect-flash");//stores messages to display to user on next page or when redirecting

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

app.get("/login", function(req, res) {
    res.render("login", {page: 'login'});
});


app.listen(3000, function(){
    console.log("Server has started");
});