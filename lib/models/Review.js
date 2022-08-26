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

  static async getReviews() {
    const { rows } = await pool.query(
      `
        SELECT reviews.* FROM reviews
        WHERE reviews.restaurant_id = $1
        `,
      [this.id]
    );
    return rows;
  }
};
