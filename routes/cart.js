const express = require('express');
const router = express.Router();
const { addToCart, viewCart, removeFromCart } = require('../controllers/cart.controller');

router.post('/add-to-cart', addToCart);
router.get('/view-cart/:userId', viewCart);
router.post('/remove-from-cart', removeFromCart);


module.exports = router;