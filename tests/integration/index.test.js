const request = require('supertest');
const app = require('../../index');

describe('API Endpoints', () => {
  it('should return welcome message', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toEqual('Welcome to the TDD API');
  });
});