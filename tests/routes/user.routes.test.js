const request = require('supertest');
const express = require('express');
const userRoutes = require('../../src/routes/user.routes');

// Create a test app
const app = express();
app.use(express.json());
app.use('/api/users', userRoutes);

describe('User Routes', () => {
  describe('POST /api/users/register', () => {
    it('should register a user with valid data', async () => {
      const res = await request(app)
        .post('/api/users/register')
        .send({
          email: 'test@example.com',
          password: 'password123',
          name: 'Test User'
        });

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body).toHaveProperty('email', 'test@example.com');
      expect(res.body).toHaveProperty('name', 'Test User');
      expect(res.body).not.toHaveProperty('password');
    });

    it('should register a user without name', async () => {
      const res = await request(app)
        .post('/api/users/register')
        .send({
          email: 'test2@example.com',
          password: 'password123'
        });

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body).toHaveProperty('email', 'test2@example.com');
      expect(res.body).not.toHaveProperty('name');
      expect(res.body).not.toHaveProperty('password');
    });

    it('should return 400 if email is missing', async () => {
      const res = await request(app)
        .post('/api/users/register')
        .send({
          password: 'password123',
          name: 'Test User'
        });

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('error');
      expect(res.body.error).toEqual('Email is required');
    });

    it('should return 400 if password is missing', async () => {
      const res = await request(app)
        .post('/api/users/register')
        .send({
          email: 'test@example.com',
          name: 'Test User'
        });

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('error');
      expect(res.body.error).toEqual('Password is required');
    });

    it('should return 400 if email format is invalid', async () => {
      const res = await request(app)
        .post('/api/users/register')
        .send({
          email: 'invalid-email',
          password: 'password123',
          name: 'Test User'
        });

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('error');
      expect(res.body.error).toEqual('Email format is invalid');
    });

    it('should return 400 if password is less than 8 characters', async () => {
      const res = await request(app)
        .post('/api/users/register')
        .send({
          email: 'test@example.com',
          password: 'short',
          name: 'Test User'
        });

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('error');
      expect(res.body.error).toEqual('Password must be at least 8 characters');
    });
  });
});