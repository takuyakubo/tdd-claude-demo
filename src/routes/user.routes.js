const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// Register a new user
router.post('/register', userController.registerUser);

// Get all users (for demo purposes)
router.get('/', userController.getAllUsers);

module.exports = router;