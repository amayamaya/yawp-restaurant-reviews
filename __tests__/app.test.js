const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('hit the users route', async () => {
    const resp = await request(app).get('/api/v1/users');
    expect(resp.status).toBe(200);
  });
  afterAll(() => {
    pool.end();
  });
});
