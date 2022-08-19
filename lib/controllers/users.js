const { Router } = require('express');
const User = require('../models/User');
const UserService = require('../services/UserService');
const { authenticate } = require('../middleware/authenticate');
const { authorize } = require('../middleware/authorize');
const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;


module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const [user, token] = await UserService.create(req.body);
      res
        .cookie(process.env.COOKIE_NAME, token, {
          httpOnly: true,
          maxAge: ONE_DAY_IN_MS,
        })
        .json({ user, message: 'Sign in successful' });
    } catch (error) {
      next(error);
    }
  })
  .post('/sessions', async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const token = await UserService.signIn({ email, password });
      res
        .cookie(process.env.COOKIE_NAME, token, {
          httpOnly: true,
          maxAge: ONE_DAY_IN_MS,
        })
        .json({ message: 'Welcome' });
    } catch (error) {
      next(error);
    }
  })
  .get('/', authenticate, authorize, async (req, res, next) => {
    try {
      const data = await User.getAll();
      res.json(data);
    } catch (error) {
      next(error);
    }
  });
