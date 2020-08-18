var fs = require('fs');
var path = require('path');
var rootDir = require('../utils/path');
const p = path.join(rootDir, 'data', 'products.json');

function getProductsFromFile(callback) {
  fs.readFile(p, (err, data) => {
    if (err) {
      callback([]);
    } else {
      callback(JSON.parse(data));
    }
  });
}

module.exports = class Product {
  constructor(title) {
    this.title = title;
  }

  save() {
    getProductsFromFile((products) => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }

  static fetchAll(callback) {
    getProductsFromFile(callback);
  }
};
