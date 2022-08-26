const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

// Built in middleware because we're dealing with authentication
// we'll need the cookie parser - avoiding data munging
app.use(express.json());
app.use(cookieParser());

// App routes - Paths: /api/v1/users + /api/v1/restaurants
app.use('/api/v1/users', require('./controllers/users'));
app.use('/api/v1/restaurants', require('./controllers/restaurants'));
app.use('/api/v1/reviews', require('./controllers/reviews'));

// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

app.use((req, res, next) => {
  next();
});

app.get('/middle', (req, res) => {
  res.json({ resp: 'this is the middle route' });
});

module.exports = app;
