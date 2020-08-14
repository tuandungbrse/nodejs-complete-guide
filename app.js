var http = require('http');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/add-product', (req, res, next) => {
  res.send(`<form action="/product" method="POST">
            <input type="text" name="title" />
            <button type="submit">Add Product</button>
          </form>`);
});

app.post('/product', (req, res, next) => {
  console.log(req.body);
  res.redirect('/');
});

app.use('/', (req, res, next) => {
  res.send(`<h1>Hello from Express!</h1>`);
});

var server = http.createServer(app);

server.listen(3000);
