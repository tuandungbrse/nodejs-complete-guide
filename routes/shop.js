var express = require('express');
var router = express.Router();
var path = require('path');
var rootPath = require('../utils/path');
router.get('/', (req, res, next) => {
  res.sendFile(path.join(rootPath, 'views', 'shop.html'));
});

module.exports = router;
