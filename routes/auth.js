var express = require('express');
var router = express.Router();

var controller = require('../controllers/auth');

router.route('/login').get(controller.getLogin).post(controller.postLogin);

router.route('/logout').post(controller.postLogout);

router.route('/signup').get(controller.getSignUp).post(controller.postSignUp);

module.exports = router;
