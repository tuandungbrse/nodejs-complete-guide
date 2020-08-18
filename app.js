var http = require('http');
var path = require('path');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var adminRoutes = require('./routes/admin');
var shopRoutes = require('./routes/shop');
var errorsController = require('./controllers/errors');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorsController.get404);

var server = http.createServer(app);

server.listen(3000);
