const User = require('../models/user.model');

/**
 * User controller for handling user-related operations
 */
const userController = {
  /**
   * Register a new user
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {Object} - Response with user or error
   */
  registerUser: async (req, res) => {
    try {
      const userData = req.body;
      
      // Validate user data
      const { valid, errors } = User.validate(userData);
      
      if (!valid) {
        return res.status(400).json({ error: errors[0] });
      }
      
      // Check if user with email already exists (for demo)
      const existingUser = User.findByEmail(userData.email);
      if (existingUser) {
        return res.status(400).json({ error: 'Email already in use' });
      }
      
      // Create user
      const user = User.create(userData);
      
      // Return user data
      return res.status(201).json(user);
    } catch (error) {
      console.error('Error registering user:', error);
      return res.status(500).json({ error: 'Server error' });
    }
  },

  /**
   * Get all users (for demo purposes)
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {Object} - Response with users
   */
  getAllUsers: async (req, res) => {
    try {
      const users = User.getAll();
      return res.status(200).json(users);
    } catch (error) {
      console.error('Error getting users:', error);
      return res.status(500).json({ error: 'Server error' });
    }
  }
};

module.exports = userController;