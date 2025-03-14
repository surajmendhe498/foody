const express= require('express');
const {addMenu, getMenu} = require('../controllers/Menu.controller');
const authenticate = require('../middleware/auth.middleware');
const router= express.Router();

router.post('/menu/add', authenticate, addMenu);
router.get('/:id/menu', getMenu);


module.exports= router;