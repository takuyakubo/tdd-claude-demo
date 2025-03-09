const User = require('../user.model');

describe('User Model', () => {
  describe('validate', () => {
    it('should validate a user with all required fields', () => {
      const userData = {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User'
      };

      const { valid, errors } = User.validate(userData);
      expect(valid).toBe(true);
      expect(errors).toBeNull();
    });

    it('should validate a user without name', () => {
      const userData = {
        email: 'test@example.com',
        password: 'password123'
      };

      const { valid, errors } = User.validate(userData);
      expect(valid).toBe(true);
      expect(errors).toBeNull();
    });

    it('should invalidate a user without email', () => {
      const userData = {
        password: 'password123',
        name: 'Test User'
      };

      const { valid, errors } = User.validate(userData);
      expect(valid).toBe(false);
      expect(errors).toContain('Email is required');
    });

    it('should invalidate a user without password', () => {
      const userData = {
        email: 'test@example.com',
        name: 'Test User'
      };

      const { valid, errors } = User.validate(userData);
      expect(valid).toBe(false);
      expect(errors).toContain('Password is required');
    });

    it('should invalidate a user with invalid email format', () => {
      const userData = {
        email: 'invalid-email',
        password: 'password123',
        name: 'Test User'
      };

      const { valid, errors } = User.validate(userData);
      expect(valid).toBe(false);
      expect(errors).toContain('Email format is invalid');
    });

    it('should invalidate a user with short password', () => {
      const userData = {
        email: 'test@example.com',
        password: 'short',
        name: 'Test User'
      };

      const { valid, errors } = User.validate(userData);
      expect(valid).toBe(false);
      expect(errors).toContain('Password must be at least 8 characters');
    });
  });

  describe('create', () => {
    it('should create a user with valid data and return user object with ID', () => {
      const userData = {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User'
      };

      const user = User.create(userData);
      expect(user).toEqual(expect.objectContaining({
        id: expect.any(String),
        email: 'test@example.com',
        name: 'Test User'
      }));
      
      // Password should not be returned directly
      expect(user).not.toHaveProperty('password');
    });

    it('should create a user without name', () => {
      const userData = {
        email: 'test@example.com',
        password: 'password123'
      };

      const user = User.create(userData);
      expect(user).toEqual(expect.objectContaining({
        id: expect.any(String),
        email: 'test@example.com'
      }));
      expect(user.name).toBeUndefined();
    });
  });
});