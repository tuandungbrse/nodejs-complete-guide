const express = require('express');
const shopController = require('../controllers/shop');
const protect = require('../middlewares/auth');
const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/products/:productId', shopController.getProduct);

router.get('/cart', protect, shopController.getCart);

router.post('/cart', protect, shopController.postCart);

router.post('/cart-delete-item', protect, shopController.postCartDeleteProduct);

router.post('/create-order', protect, shopController.postOrder);

router.get('/orders', protect, shopController.getOrders);

module.exports = router;
