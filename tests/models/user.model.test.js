const User = require('../../src/models/user.model');

describe('User Model', () => {
  describe('validate', () => {
    // テスト: すべての必須項目（メールアドレス、パスワード）と名前がある場合に検証が成功することを確認
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

    // テスト: 名前がなくても必須項目（メールアドレス、パスワード）があれば検証が成功することを確認
    it('should validate a user without name', () => {
      const userData = {
        email: 'test@example.com',
        password: 'password123'
      };

      const { valid, errors } = User.validate(userData);
      expect(valid).toBe(true);
      expect(errors).toBeNull();
    });

    // テスト: メールアドレスが必須であることを確認
    it('should invalidate a user without email', () => {
      const userData = {
        password: 'password123',
        name: 'Test User'
      };

      const { valid, errors } = User.validate(userData);
      expect(valid).toBe(false);
      expect(errors).toContain('Email is required');
    });

    // テスト: パスワードが必須であることを確認
    it('should invalidate a user without password', () => {
      const userData = {
        email: 'test@example.com',
        name: 'Test User'
      };

      const { valid, errors } = User.validate(userData);
      expect(valid).toBe(false);
      expect(errors).toContain('Password is required');
    });

    // テスト: メールアドレスの形式が正しくない場合に検証が失敗することを確認
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

    // テスト: パスワードが8文字未満の場合に検証が失敗することを確認
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
    // テスト: 有効なデータでユーザーを作成し、IDを含むオブジェクトが返されることを確認
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
      
      // パスワードは返されない（セキュリティのため）
      expect(user).not.toHaveProperty('password');
    });

    // テスト: 名前なしでユーザーを作成できることを確認（名前はオプション）
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