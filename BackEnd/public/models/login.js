var express = require("express");
var passport = require("passport");
var LocalStrategy = require("passport-local");//lets you authenticate using a username and password using Passport
var cookieParser = require("cookie-parser");
var session = require("express-session");//creates a session for login

var app = express();//

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
    function(email, password, done) {
        ClientDetails.findOne({ username: email}, function (err, user) {
            if (err) { return done(err); }
            if (!email) { return done(null, false); }
            if(!email.verifyPassword(password)) { return done(null, false); }
            return done(null, email);
        });
    }
));

app.post('/login',
passport.authenticate('local', { failureRedirect: '/login' }),
    function(req, res) {
        res.redirect('stocks');
    });