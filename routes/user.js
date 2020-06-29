const express = require('express');
const bodyParser = require('body-parser');
const userController = require('../controllers/user_controller');
const router = express.Router();
const passport = require('passport');

router.use(express.urlencoded({ extended: true }));
router.use(bodyParser.json());

// To sign up the user
router.get('/sign-up', userController.signUp);

// To sign in the user
router.get('/sign-in', userController.signIn);

// To create user profile
router.post('/create-user', userController.createUser);

// To create user session
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/'}
), userController.createSession)

// To check the authentication before accessing profile
router.get('/profile', passport.checkAuthentication, userController.profile);

// To destory the user session so that no trace will be found in cookies
router.get('/destroy-session', userController.destroy);
// To reset password page
router.get('/reset-password', userController.resetPage);
// To reset password
router.post('/reset', userController.reset);
router.get('/forgot-password', userController.forgotPassword);
router.post('/forgot', userController.forgot);


router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
router.get('/google/auth/callback', passport.authenticate('google', { failureRedirect: '/sign-in' }), userController.createSession)

module.exports = router;