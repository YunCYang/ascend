const app = require('./index');
const supertest = require('supertest');
const request = supertest(app);

describe('Initial Jest Test', () => {
  it('test true is true', () => {
    expect(true).toBe(true);
  });

  it('health check', async done => {
    const res = await request.get('/api/health-check');
    expect(res.body.message).toBe('successfully connected');
    done();
  });
});
