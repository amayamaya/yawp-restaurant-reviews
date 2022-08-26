const Router = require('express').Router;
const Restaurant = require('../models/Restaurant');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');
const Review = require('../models/Review');

module.exports = Router()
  .get('/', async (req, res) => {
    const restaurants = await Restaurant.getAll();

    const ids = restaurants.map((restaurant) => ({
      id: restaurant.id,
      name: restaurant.name,
    }));
    res.json(ids);
  })

  .get('/:id', async (req, res) => {
    const food = await Restaurant.getById(req.params.id);
    // console.log('hey food', food);
    // food.reviews = await Restaurant.getReviews();
    res.json(food);
  })
  .post('/:id/reviews', [authenticate, authorize], async (req, res, next) => {
    try {
      const review = await Review.insertReview(
        req.body,
        req.params.id,
        req.user.id
      );
      res.json(review);
    } catch (error) {
      next(error);
    }
  });

// POST by restaurant_id /api/v1/restaurants/:restaurant_id/reviews (posts a review)
// DELETE reviews by id /api/v1/reviews/:id (deletes a review)
// you can use sql tables to view the data from multiple tables
