const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

const testUser = {
  id: '1',
  username: 'tester123',
  email: 'test@user.com',
  password: '123456',
};

// const registerAndLogin = async (userProps = {}) => {
//   const password = userProps.password ?? testUser.password;
//   const agent = request.agent(app);
//   const user = { ...testUser, ...userProps };
//   const { email } = user;
//   await agent.post('/api/v1/users/sessions').send({ email, password });
//   return [agent, user];
// };

describe('backend-express-yawp-routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('#POST creates user and user-cookie', async () => {
    const resp = await request(app).post('/api/v1/users').send(testUser);
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

  it('#GET shows a list of users, only for authorized members', async () => {
    const agent = request.agent(app);
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
});
it('shows lists of restaurants', async () => {
  const res = await request(app).get('/api/v1/restaurants');
  expect(res.status).toEqual(200);
});
