const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/userService');

const testUser = {
  username: 'tester123',
  email: 'test@user.com',
  password: '123456',
};

const registerAndLogin = async (userProps = {}) => {
  const password = userProps.password ?? testUser.password;
  const agent = request.agent(app);
  const user = await UserService.create({ ...testUser, ...userProps });
  const { email } = user;
  await agent.post('/api/v1/users/sessions').send({ email, password });
  return [agent, user];
};

describe('backend-express-yawp-routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  afterAll(() => {
    pool.end();
  });

  it('#POST creates user and user-cookie', async () => {
    const resp = await request(app).post('/api/v1/users').send(testUser);
    // console.log(resp.body);
    const { email } = testUser;
    expect(resp.status).toEqual(200);

    //body referring to the json
    expect(resp.body).toEqual({
      message: 'Sign in successful',
      user: {
        id: expect.any(String),
        email,
      },
    });
  });

  it('#POST signs in an existing user', async () => {
    await request(app).post('/api/v1/users').send(testUser);
    const res = await request(app)
      .post('/api/v1/users/sessions')
      .send({ email: 'test@user.com', password: '123456' });
    // console.log(res.status);
    expect(res.status).toEqual(200);
  });

  it('#GET shows a list of users, only for authenticated members', async () => {
    const [agent] = await registerAndLogin();
    await agent
      .post('/api/v1/users')
      .send({ ...testUser, email: '123@admin.com' });
    await agent
      .post('/api/v1/users/sessions')
      .send({ ...testUser, email: '123@admin.com' });
    const res = await agent.get('/api/v1/users');
    expect(res.status).toEqual(200);
  });

  //want to see a 403 when seeing users and not authorized
  it('#GET shows a list of users, only for un-authorized members', async () => {
    const agent = request.agent(app);
    await agent.post('/api/v1/users').send(testUser);
    await agent.post('/api/v1/users/sessions').send(testUser);
    const res = await agent.get('/api/v1/users');
    expect(res.status).toEqual(403);
  });

  it('#GET shows lists of restaurants', async () => {
    const res = await request(app).get('/api/v1/restaurants');
    expect(res.status).toEqual(200);
    expect(res.body[0]).toEqual({
      id: expect.any(String),
      name: expect.any(String),
    });
  });
  it('#GET shows a review from a single restaurant', async () => {
    const res = await request(app).get('/api/v1/restaurants/1');
    expect(res.body).toHaveProperty('id', '1');
    expect(res.body).toHaveProperty('name', 'McDonalds');
    expect(res.body).toHaveProperty('style', 'Fast Burger');
    expect(res.body.reviews[0]).toHaveProperty('id', 1);
  });

  it('#POST creates a review user if signed in', async () => {
    const newReview = {
      stars: '5',
      details: 'Happy with the Hut',
      restaurant_id: '3',
    };
    const [agent] = await registerAndLogin();
    await agent
      .post('/api/v1/users')
      .send({ ...testUser, email: '123@admin.com' });
    const res = await agent
      .post('/api/v1/restaurants/2/reviews')
      .send(newReview);
    expect(res.body).toEqual({
      id: expect.any(String),
      ...newReview,
    });
  });

  it('#DELETE should delete a review for admin', async () => {
    const [agent] = await registerAndLogin();
    await agent
      .post('/api/v1/users')
      .send({ ...testUser, email: '123@admin.com' });
    const res = await agent.delete('/api/v1/reviews/2');
    // console.log('heyres', res);
    expect(res.status).toEqual(200);
    const resp = await agent.get('/api/v1/reviews/2');
    expect(resp.status).toEqual(404);
  });
});
