const express = require('express');
const router = express.Router();

const AuthService = require('./auth.service');
const user = require('./user/user.controller');
const product = require('./product/product.controller');
const sprint = require('./sprint/sprint.controller');

// sprint
router.get('/sprints', sprint.find);
router.post('/products/:productId/sprints', sprint.post);

// product
router.get('/products', product.find);
router.get('/products/:id', product.find);
router.post('/products', product.post);
router.put('/products/:id', product.put);

// users
router.get('/users', AuthService.authenticate, user.find)
router.get('/users/:id', AuthService.authenticate, user.find)

// login 
router.post('/login', user.login);

// register
router.post('/register', user.register);

module.exports = router;
