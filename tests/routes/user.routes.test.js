const request = require('supertest');
const express = require('express');
const userRoutes = require('../../src/routes/user.routes');

// Create a test app
const app = express();
app.use(express.json());
app.use('/api/users', userRoutes);

describe('User Routes', () => {
  describe('POST /api/users/register', () => {
    // テスト: 有効なデータ（メールアドレス、パスワード、名前）でユーザー登録できることを確認
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

    // テスト: 名前なしでもユーザー登録できることを確認（名前はオプション）
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

    // テスト: メールアドレスが欠けている場合は400エラーを返す（メールアドレスは必須）
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

    // テスト: パスワードが欠けている場合は400エラーを返す（パスワードは必須）
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

    // テスト: メールアドレスの形式が無効な場合は400エラーを返す（メール形式の検証）
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

    // テスト: パスワードが8文字未満の場合は400エラーを返す（パスワード長の検証）
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