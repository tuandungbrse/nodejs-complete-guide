var Sequelize = require('sequelize');
var sequelize = require('../utils/database');

var CartItem = sequelize.define('cartItem', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  quantity: {
    type: Sequelize.INTEGER
  }
});

module.exports = CartItem;
