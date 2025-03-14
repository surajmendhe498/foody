const express= require('express');
const { addRestaurant, fetchRestaurant } = require('../controllers/restaurant.controller');
const authenticate = require('../middleware/auth.middleware');
const router= express.Router();

router.post('/add', authenticate, addRestaurant);
router.get('/', fetchRestaurant);


module.exports= router;
