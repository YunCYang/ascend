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
    const duplicateEmailRes = await request.post('/api/auth/signup').send({
      userName: 'alex6',
      email: 'alex@gmail.com',
      password: 'Abcd123!'
    });
    expect(duplicateEmailRes.status).toBe(400);
    expect(duplicateEmailRes.body.error).toBe('email alex@gmail.com already exists');
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
    const successRes = await request.post('/api/auth/login').send({
      userName: 'alex',
      password: 'Abcd123!'
    });
    expect(successRes.status).toBe(200);
    expect(successRes.body).toEqual({
      userId: 1,
      userName: 'alex',
      status: 200
    });
    done();
  });

  it('update password', async done => {
    const emptyRes = await request.put('/api/auth/update').send({});
    expect(emptyRes.status).toBe(400);
    expect(emptyRes.body.error).toBe('missing user id');
    const noPwdRes = await request.put('/api/auth/update').send({
      userId: 1
    });
    expect(noPwdRes.status).toBe(400);
    expect(noPwdRes.body.error).toBe('missing password');
    const noTokenRes = await request.put('/api/auth/update').send({
      userId: 1,
      password: 'Abcd123!'
    });
    expect(noTokenRes.status).toBe(400);
    expect(noTokenRes.body.error).toBe('missing token');
    const invalidUserIdRes = await request.put('/api/auth/update').send({
      userId: 'a',
      password: 'Abcd123!',
      token: 'abc'
    });
    expect(invalidUserIdRes.status).toBe(400);
    expect(invalidUserIdRes.body.error).toBe('id a is not a valid positive integer');
    const invalidPasswordRes = await request.put('/api/auth/update').send({
      userId: 1,
      password: 'Abcd123',
      token: 'abc'
    });
    expect(invalidPasswordRes.status).toBe(400);
    expect(invalidPasswordRes.body.error).toBe('password is not valid');
    const invalidTokenRes = await request.put('/api/auth/update').send({
      userId: 1,
      password: 'Abcd123!',
      token: 'abcdotdot123'
    });
    expect(invalidTokenRes.status).toBe(400);
    expect(invalidTokenRes.body.error).toBe('token is not valid');
    const nonExistingUserRes = await request.put('/api/auth/update').send({
      userId: 100000,
      password: 'Abcd123!',
      token: 'abcdotdot123dotdotdef'
    });
    expect(nonExistingUserRes.status).toBe(404);
    expect(nonExistingUserRes.body.error).toBe('user of id 100000 does not exist');
    done();
  });

  it('get all routes', async done => {
    const getAllRes = await request.get('/api/route/all');
    expect(getAllRes.status).toBe(200);
    expect(getAllRes.body.length).toBeGreaterThanOrEqual(1);
    done();
  });

  it('get 10 routes for 1 page', async done => {
    const invalidUserIdRes = await request.get('/api/route/page/a/1');
    expect(invalidUserIdRes.status).toBe(400);
    expect(invalidUserIdRes.body.error).toBe('id a is not a valid positive integer');
    const invalidRouteIdRes = await request.get('/api/route/page/1/a');
    expect(invalidRouteIdRes.status).toBe(400);
    expect(invalidRouteIdRes.body.error).toBe('id a is not a valid positive integer');
    const nonExistingUserRes = await request.get('/api/route/page/100000/1');
    expect(nonExistingUserRes.status).toBe(404);
    expect(nonExistingUserRes.body.error).toBe('user of id 100000 does not exist');
    const successRes = await request.get('/api/route/page/1/10');
    expect(successRes.status).toBe(200);
    expect(successRes.body.length).toBe(10);
    done();
  });
});
