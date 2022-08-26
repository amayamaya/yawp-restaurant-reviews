const pool = require('../utils/pool');

module.exports = class Review {
  id;
  name;
  style;
  details;
  stars;
  restaurant_id;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.style = row.style;
    this.details = row.details;
    this.stars = row.stars;
    this.restaurant_id = row.restaurant_id;
  }
  static async insertReview({ restaurant_id, user_id, stars, details }) {
    const { rows } = await pool.query(
      `
        INSERT INTO reviews (restaurant_id, user_id, stars, details)
        VALUES ($1, $2, $3, $4)
        RETURNING *
        `,
      [restaurant_id, user_id, stars, details]
    );
    return new Review(rows[0]);
  }
};
