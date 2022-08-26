const pool = require('../utils/pool');

module.exports = class User {
  id;
  username;
  email;
  #passwordHash;

  constructor(row) {
    this.id = row.id;
    this.username = row.user_name;
    this.email = row.email;
    this.#passwordHash = row.password_hash;
  }
  //create a new user
  static async insert({ username, email, passwordHash }) {
    const { rows } = await pool.query(
      `
    INSERT INTO yawp_users (username, email, password_hash)
    VALUES ($1, $2, $3)
    RETURNING *
  `,
      [username, email, passwordHash]
    );

    return new User(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM yawp_users');

    return rows.map((row) => new User(row));
  }
  static async getByEmail(email) {
    const { rows } = await pool.query(
      `
    SELECT * FROM yawp_users
    WHERE email = $1
  `,
      [email]
    );

    if (!rows[0]) return null;
    return new User(rows[0]);
  }

  static async getUserId(id) {
    const { rows } = await pool.query(
      `
    SELECT * FROM yawp_users
    WHERE id=$1
  `,
      [id]
    );
    if (!rows[0]) return null;
    return new User(rows[0]);
  }

  get passwordHash() {
    return this.#passwordHash;
  }
};
