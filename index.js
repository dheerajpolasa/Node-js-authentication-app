const express = require('express');
const port = 8080;
const path = require('path');
const expressLayouts = require('express-ejs-layouts')
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const db = require('./config/mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport')
const passportLocal = require('./config/passport-local-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');
const flash = require('connect-flash');
const custMiddleware = require('./config/middleware')

const app = express();

app.use(expressLayouts)
app.use(express.urlencoded()); 
app.use(cookieParser())
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('assests'));


// mongo store for storing user session
app.use(session({
    name: 'nodejs-authentication',
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoStore({
        mongooseConnection: db,
        autoRemove: 'disabled'
    }, function(err) {
        if(err) {
            console.log('Error in Mongo store');
            return;
        }
        console.log('Working')
    })
}));

// for sessions
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(custMiddleware.setFlash)
app.use('/', require('./routes'));

app.listen(port, function(err) {
    if(err) {
        console.log('Error while listening to port: ', port);
        console.log(err);
        return;
    }
    console.log('Yup, server is running on port: ', port);
})