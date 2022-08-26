const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');
const Review = require('../models/Review');

module.exports = Router().delete(
  '/:id',
  authenticate,
  authorize,
  async (req, res, next) => {
    try {
      const data = await Review.delete(req.params.id);
      res.json(data);
    } catch (error) {
      next(error);
    }
  }
);
