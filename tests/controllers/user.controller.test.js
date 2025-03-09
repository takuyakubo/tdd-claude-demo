const userController = require('../../src/controllers/user.controller');

describe('User Controller', () => {
  describe('registerUser', () => {
    // テスト: 有効な入力（メールアドレス、パスワード、名前）でユーザー登録し、ID含むオブジェクトを返す
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
      // セキュリティのためパスワードは返さない
      expect(res.json).not.toHaveBeenCalledWith(
        expect.objectContaining({
          password: expect.any(String)
        })
      );
    });

    // テスト: メールアドレスが欠けている場合は400エラーを返す（必須項目の検証）
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

    // テスト: パスワードが欠けている場合は400エラーを返す（必須項目の検証）
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

    // テスト: メールアドレスの形式が無効な場合は400エラーを返す（メールアドレス形式の検証）
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

    // テスト: パスワードが8文字未満の場合は400エラーを返す（パスワード長の検証）
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

    // テスト: 名前なしでユーザー登録できることを検証（名前はオプション）
    it('should register a user without name', async () => {
      const req = {
        body: {
          email: 'test2@example.com', // 競合を避けるため異なるメールアドレスを使用
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