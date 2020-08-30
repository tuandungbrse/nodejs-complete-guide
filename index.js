require('dotenv').config();
var http = require('http');
var app = require('./app');
var server = http.createServer(app);
var mongoose = require('mongoose');

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    server.listen(3000);
  })
  .catch((error) => console.log(error));
