const Router = require('express').Router;
const Restaurant = require('../models/Restaurant');

module.exports = Router().get('/', async (req, res) => {
  const restaurants = await Restaurant.getAll();

  const ids = restaurants.map((restaurant) => ({
    id: restaurant.id,
    name: restaurant.name,
  }));
  res.json(ids);
});
