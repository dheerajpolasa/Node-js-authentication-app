const express = require('express');
const bodyParser = require('body-parser');
const homeController = require('../controllers/home_controller');
const router = express.Router();
const passport = require('passport');

router.use(express.urlencoded({ extended: true }));
router.use(bodyParser.json());

// Home Page of the application
router.get('/', homeController.home);

// User routes will be handled by user route
router.use('/users', require('./user'));

module.exports = router;