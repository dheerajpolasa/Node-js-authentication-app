const User = require('../models/user')
const bcrypt = require('bcrypt');
const { model } = require('../models/user');
const { hash } = require('bcryptjs');
const request = require('request');
const requestPromise = require('request-promise')
// Home controller
module.exports.home = function(req, res) {
    try {
        if(req.isAuthenticated()) {
            return res.render('profile');
        }
        return res.render('home');
    } catch(err) {
        console.log('Error', err);
        return res.redirect('back');
    }
};