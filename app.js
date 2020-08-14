var http = require('http');
var path = require('path');
var rootDir = require('./utils/path');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var adminRoutes = require('./routes/admin');
var shopRoutes = require('./routes/shop');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(rootDir, 'views', '404.html'));
});

var server = http.createServer(app);

server.listen(3000);
