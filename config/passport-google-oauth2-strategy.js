const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

// tell passport to use new strategy
passport.use(new googleStrategy({
        clientID: "32362630291-damhi8k4r205agnai7d8jaipdhv6pgnd.apps.googleusercontent.com",
        clientSecret: "2q2aJSCFZl3Erb23VO52KDYZ",
        callbackURL: "http://localhost:8080/users/google/auth/callback"
    },

    function(accessToken, refreshToken, profile, done) {

        // find a user
        User.findOne({email: profile.emails[0].value}).exec(function(err, user) {
            if(err) { console.log('Error in google strategy'); return; }
            console.log(profile);

            if(user) {
                // if found, use that user
                return done(null, user);
            } else {

                // if not found, create new user
                User.create({
                    email: profile.emails[0].value,
                    // Randomly generate a password
                    password: crypto.randomBytes(20).toString('hex')
                }, function(err, user) {
                    if(err) {console.log('Error :', err); return;}

                    return done(null, user);
                })
            }
        })
    }
))

module.exports = passport;