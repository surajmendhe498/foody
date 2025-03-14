const express= require('express');
const { signUp, login, getAllUsers, getUser } = require('../controllers/user.controller');
const authenticate = require('../middleware/auth.middleware');
const router= express.Router();

router.post('/signup', signUp);
router.post('/login', login);
router.get('/', getAllUsers);
router.get('/me', authenticate, getUser);

module.exports= router;