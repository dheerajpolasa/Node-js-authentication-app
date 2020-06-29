const User = require('../models/user')
const bcrypt = require('bcrypt');
const { model } = require('../models/user');
const { hash } = require('bcryptjs');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const EMAIL = '<your mail>'
const PASSWORD = '<your password>'

// Controller for sign in
module.exports.signIn = function(req, res) {
    try {
        if(req.isAuthenticated()) {
            return res.redirect('/users/profile');
        }
        return res.render('sign-in');
    } catch(err) {
        console.log('Error', err);
        return res.redirect('back')
    }
}


// Controller for sign up
module.exports.signUp = function(req, res) {
    try {
        if(req.isAuthenticated()) {
            return res.redirect('/users/profile')
        }
        return res.render('sign-up');
    } catch(err) {
        console.log('Error', err);
        return res.redirect('back')
    }
}

// Creates the session
module.exports.createSession = function(req, res) {
    req.flash('success', 'Logged In Successfully')
    return res.redirect('/users/profile');
}


// Creates the user
module.exports.createUser = async function(req, res) {
    try {
        console.log(req.body);
        if(req.body.password !== req.body['confirm-password']) {
            req.flash('error', 'Passwords doesnt match');
            return res.redirect('back');
        }

        
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        console.log(hashedPassword);
        User.create({email: req.body.email, password: hashedPassword});
        req.flash('success', 'User created successfully');
        return res.render('sign-in');
    } catch(err) {
        console.log('Error', err);
        req.flash('error', err);
        return res.redirect('back')
    }
}

// Redirects to profile
module.exports.profile = function(req, res) {
    return res.render('profile');
}

// To reset the user password
module.exports.reset = async function(req, res) {
    try {
        let user = await User.findOne({email: req.body.email});
        console.log(req.body);
        // Checks for password and confirm password
        if(req.body['new-password'] !== req.body['confirm-password']) {
            console.log('passwords not matching');
            req.flash('error', 'Passwords doesnt match')
            return res.redirect('back');
        }

        // Checks whether the current entered password matches with db password
        if(await bcrypt.compare(req.body['current-password'], user.password)) {
            console.log('matched')
            const hashedPassword = await bcrypt.hash(req.body['new-password'], 10);
            user.password = hashedPassword;
            user.save();
            req.flash('Password updated successfully');
            return res.redirect('/users/destroy-session');
        }
        console.log('error')
        req.flash('Wrong Current Password');
        return res.redirect('back');
    } catch(err) {
        console.log('Error : ', err);
        req.flash('error', err);
        return res.redirect('back');
    }
}

// Redirects to reset page
module.exports.resetPage = function(req, res) {
    return res.render('reset');
}


// Destroys the session
module.exports.destroy = function(req, res) {
    req.logout();
    req.flash('success', 'You have logged out..!');
    return res.redirect('/');
}

// Redirects to forgot password page
module.exports.forgotPassword = function(req, res) {
    return res.render('forgot-password');
}

// Sends a mail with randomly generated new password
module.exports.forgot = async function(req, res) {
    console.log(req.params);
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: EMAIL,
          pass: PASSWORD
        }
    });
    const user = await User.findOne({email: req.body.email});
    console.log(user.email);
    const newPassword = crypto.randomBytes(10).toString('hex');
    user.password = await bcrypt.hash(newPassword, 10);
    user.save();
    let mailOptions = {
        from: EMAIL,
        to: user.email,
        subject: 'Sending New Password Email using Node.js',
        text: `This is the new password - ${newPassword} `
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
    });
    req.flash('success', 'New password sent to mail');
    return res.redirect('back');
}