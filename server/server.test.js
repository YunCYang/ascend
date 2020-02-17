const app = require('./index');
const supertest = require('supertest');
const request = supertest(app);

describe('Initial Jest Test', () => {
  it('test true is true', () => {
    expect(true).toBe(true);
  });

  it('health check', async done => {
    const response = await request.get('/api/health-check');
    expect(response.body.message).toBe('successfully connected');
    done();
  });

  it('sign up', async done => {
    const emptyRes = await request.post('/api/auth/signup').send({});
    expect(emptyRes.status).toBe(400);
    expect(emptyRes.body.error).toBe('missing user name');
    const noEmailRes = await request.post('/api/auth/signup').send({
      userName: 'alex'
    });
    expect(noEmailRes.status).toBe(400);
    expect(noEmailRes.body.error).toBe('missing email');
    const noPwdRes = await request.post('/api/auth/signup').send({
      userName: 'alex',
      email: 'alex@gmail.com'
    });
    expect(noPwdRes.status).toBe(400);
    expect(noPwdRes.body.error).toBe('missing password');
    const duplicateUserRes = await request.post('/api/auth/signup').send({
      userName: 'alex',
      email: 'alex@gmail.com',
      password: 'Abcd123!'
    });
    expect(duplicateUserRes.status).toBe(400);
    expect(duplicateUserRes.body.error).toBe('user name alex already exists');
    const invalidEmailRes = await request.post('/api/auth/signup').send({
      userName: 'alex',
      email: 'alex@alex',
      password: 'Abcd123!'
    });
    expect(invalidEmailRes.status).toBe(400);
    expect(invalidEmailRes.body.error).toBe('email alex@alex is not valid');
    const invalidPasswordRes = await request.post('/api/auth/signup').send({
      userName: 'alex',
      email: 'alex@gmail.com',
      password: 'Abcd123'
    });
    expect(invalidPasswordRes.status).toBe(400);
    expect(invalidPasswordRes.body.error).toBe('password is not valid');
    done();
  });

  it('log in', async done => {
    const emptyRes = await request.post('/api/auth/login').send({});
    expect(emptyRes.status).toBe(400);
    expect(emptyRes.body.error).toBe('missing user name');
    const noPwdRes = await request.post('/api/auth/login').send({
      userName: 'alex'
    });
    expect(noPwdRes.status).toBe(400);
    expect(noPwdRes.body.error).toBe('missing password');
    const invalidUserNameRes = await request.post('/api/auth/login').send({
      userName: 'shauna',
      password: 'Abcd123!'
    });
    expect(invalidUserNameRes.status).toBe(404);
    expect(invalidUserNameRes.body.error).toBe('user name shauna does not exist');
    const invalidPwdRes = await request.post('/api/auth/login').send({
      userName: 'alex',
      password: 'Abcd123'
    });
    expect(invalidPwdRes.status).toBe(401);
    expect(invalidPwdRes.body.error).toBe('password does not match');
    const successLogInRes = await request.post('/api/auth/login').send({
      userName: 'alex',
      password: 'Abcd123!'
    });
    expect(successLogInRes.status).toBe(200);
    expect(successLogInRes.body).toEqual({
      userId: 1,
      userName: 'alex'
    });
    done();
  });
});
