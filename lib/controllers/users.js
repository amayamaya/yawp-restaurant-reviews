const { Router } = require('express');
const UserService = require('../services/UserService');
const { authenticate } = require('../middleware/authenticate');
const User = require('../models/User');

const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

module.exports = Router()
  // .get('/', authenticate, async (req, res, next) => {
  //   try {
  //     const users = await User.getAll();
  //     res.json(users);
  //   } catch (err) {
  //     next(err);
  //   }
  // })
  .post('/', async (req, res, next) => {
    try {
      const [user, token] = await UserService.create(req.body);
      res
        .cookie(process.env.COOKIE_NAME, token, {
          httponly: true,
          maxAge: ONE_DAY_IN_MS,
        })
        .json({ user, message: 'Sign in successful' });
    } catch (err) {
      next(err);
    }
  });
