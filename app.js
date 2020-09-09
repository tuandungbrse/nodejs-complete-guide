var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);
var csrf = require('csurf');
var csrfProtection = csrf();

var adminRoutes = require('./routes/admin');
var shopRoutes = require('./routes/shop');
var errorsController = require('./controllers/error');
var authRoutes = require('./routes/auth');

var User = require('./models/user');

var app = express();
var store = new MongoDBStore({
  uri: process.env.MONGO_URL,
  collection: 'sessions'
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    secret: '123456789',
    resave: false,
    saveUninitialized: false,
    store: store
  })
);
app.use(csrfProtection);

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);
app.use(errorsController.get404);

module.exports = app;
