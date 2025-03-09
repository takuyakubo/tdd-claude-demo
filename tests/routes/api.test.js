const request = require('supertest');
const express = require('express');
const apiRoutes = require('../../routes/api');

// Create a test app
const app = express();
app.use(express.json());
app.use('/api', apiRoutes);

describe('API Routes', () => {
  it('should return hello message', async () => {
    const res = await request(app).get('/api/hello');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toEqual('Hello World');
  });
});