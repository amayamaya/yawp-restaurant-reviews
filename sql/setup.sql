-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS yawp_users;

CREATE TABLE yawp_users (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username TEXT NOT NULL,
    email TEXT NOT NULL,
    password_hash TEXT NOT NULL
);

INSERT INTO yawp_users (username, email, password_hash) 
VALUES 
('test123', 'test123@test.com', 'nottest123passwordhash'),
('test234', 'test234@test.com', 'nottest234passwordhash'),
('test345', 'test345@test.com', 'nottest345passwordhash')

