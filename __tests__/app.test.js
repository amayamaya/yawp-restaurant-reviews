const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

const testUser = {
  firstName: 'Test',
  lastName: 'User',
  email: 'test@user.com',
  password: 'testtest',
};

const registerAndLogin = async (userProps = {}) => {
  const password = userProps.password ?? testUser.password;
  const agent = request.agent(app);
  const user = { ...testUser, ...userProps };
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
    const { firstName, lastName, email } = testUser;
    expect(resp.status).toEqual(200);
    //body referring to the json
    expect(resp.body).toEqual({
      message: 'Sign in successful',
      user: {
        id: expect.any(String),
        firstName,
        lastName,
        email,
      },
    });
  });

  it('#POST signs in an existing user', async () => {
    await request(app).post('/api/v1/users').send(testUser);
    const res = await request(app)
      .post('/api/v1/users/sessions')
      .send({ email: 'test@user.com', password: 'testtest' });
    console.log(res.status);
    expect(res.status).toEqual(200);
  });

  it('#GET shows a list of users, only for authenticated members', async () => {
    const [agent] = await registerAndLogin();
    const res = await agent.get('/api/v1/users');
    expect(res.status).toEqual(200);
  });
