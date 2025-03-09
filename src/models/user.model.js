const { v4: uuidv4 } = require('uuid');

// Simple in-memory user store for demo purposes
const users = [];

class User {
  /**
   * Validate user data
   * @param {Object} userData - User data to validate
   * @returns {Object} - Validation result { valid: boolean, errors: string[] | null }
   */
  static validate(userData) {
    const errors = [];

    // Check required fields
    if (!userData.email) {
      errors.push('Email is required');
    } else if (!this.isValidEmail(userData.email)) {
      errors.push('Email format is invalid');
    }

    if (!userData.password) {
      errors.push('Password is required');
    } else if (userData.password.length < 8) {
      errors.push('Password must be at least 8 characters');
    }

    return {
      valid: errors.length === 0,
      errors: errors.length > 0 ? errors : null
    };
  }

  /**
   * Create a new user
   * @param {Object} userData - User data to create
   * @returns {Object} - Created user object (without password)
   */
  static create(userData) {
    // Create user with ID
    const user = {
      id: uuidv4(),
      email: userData.email,
      // Store password securely in real app (hashed)
      // We don't return the password in the response
      // but we'd store it in the database
      _password: userData.password
    };

    // Add name if provided
    if (userData.name) {
      user.name = userData.name;
    }

    // Add to users array (for demo purposes)
    users.push(user);

    // Return user without password
    const { _password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  /**
   * Validate email format
   * @param {string} email - Email to validate
   * @returns {boolean} - Whether email is valid
   */
  static isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Find user by email (for demo purposes)
   * @param {string} email - Email to search for
   * @returns {Object|null} - Found user object or null
   */
  static findByEmail(email) {
    return users.find(user => user.email === email) || null;
  }

  /**
   * Get all users (for demo purposes)
   * @returns {Array} - Array of user objects
   */
  static getAll() {
    return users.map(user => {
      const { _password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
  }
}

module.exports = User;