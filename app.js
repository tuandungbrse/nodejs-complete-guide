var path = require('path');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var adminRoutes = require('./routes/admin');
var shopRoutes = require('./routes/shop');
var errorsController = require('./controllers/error');

var User = require('./models/user');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  User.findById('5f4b959958254f8544b463b6')
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errorsController.get404);

module.exports = app;
