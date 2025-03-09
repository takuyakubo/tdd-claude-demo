const userController = require('../../src/controllers/user.controller');

describe('User Controller', () => {
  describe('registerUser', () => {
    it('should register a user with valid input and return user object with ID', async () => {
      const req = {
        body: {
          email: 'test@example.com',
          password: 'password123',
          name: 'Test User'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await userController.registerUser(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          id: expect.any(String),
          email: 'test@example.com',
          name: 'Test User'
        })
      );
      // Password should not be returned
      expect(res.json).not.toHaveBeenCalledWith(
        expect.objectContaining({
          password: expect.any(String)
        })
      );
    });

    it('should return 400 if email is missing', async () => {
      const req = {
        body: {
          password: 'password123',
          name: 'Test User'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await userController.registerUser(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Email is required'
      });
    });

    it('should return 400 if password is missing', async () => {
      const req = {
        body: {
          email: 'test@example.com',
          name: 'Test User'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await userController.registerUser(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Password is required'
      });
    });

    it('should return 400 if email format is invalid', async () => {
      const req = {
        body: {
          email: 'invalid-email',
          password: 'password123',
          name: 'Test User'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await userController.registerUser(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Email format is invalid'
      });
    });

    it('should return 400 if password is less than 8 characters', async () => {
      const req = {
        body: {
          email: 'test@example.com',
          password: 'short',
          name: 'Test User'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await userController.registerUser(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Password must be at least 8 characters'
      });
    });

    it('should register a user without name', async () => {
      const req = {
        body: {
          email: 'test2@example.com', // Use a different email to avoid conflict
          password: 'password123'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await userController.registerUser(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          id: expect.any(String),
          email: 'test2@example.com'
        })
      );
    });
  });
});