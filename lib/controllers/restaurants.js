const Router = require('express').Router;
const Restaurant = require('../models/Restaurant');

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
    console.log('hey food', food);
    // food.reviews = await Restaurant.getReviews();
    res.json(food);
  });

// POST by restaurant_id /api/v1/restaurants/:restaurant_id/reviews (posts a review)
// DELETE reviews by id /api/v1/reviews/:id (deletes a review)
// you can use sql tables to view the data from multiple tables
