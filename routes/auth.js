var express = require('express');
var router = express.Router();

var authControlelr = require('../controllers/auth');

router
  .route('/login')
  .get(authControlelr.getLogin)
  .post(authControlelr.postLogin);

router.route('/logout').post(authControlelr.postLogout);

module.exports = router;
