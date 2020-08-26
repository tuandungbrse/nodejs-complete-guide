var http = require('http');
var app = require('./app');
var sequelize = require('./utils/database');
var server = http.createServer(app);

var Product = require('./models/product');
var User = require('./models/user');
var Cart = require('./models/cart');
var CartItem = require('./models/cart-item');

var Order = require('./models/order');
var OrderItem = require('./models/order-item');
Product.belongsTo(User, {
  constraints: true,
  onDelete: 'CASCADE'
});

User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem });

sequelize
  .sync()
  .then((result) => {
    // console.log(result);
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: 'Max', email: 'test@test.com' });
    }
    return user;
  })
  .then((user) => {
    return user.createCart();
  })
  .then((cart) => {
    server.listen(3000);
  })
  .catch((err) => console.log(err));
