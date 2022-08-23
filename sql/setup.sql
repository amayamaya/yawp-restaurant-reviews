DROP TABLE IF EXISTS yawp_users cascade;
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
('test345', 'test345@test.com', 'nottest345passwordhash');

DROP TABLE IF EXISTS restaurants cascade;
CREATE TABLE restaurants (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT,
  style TEXT,
  stars BIGINT
  );

INSERT into restaurants (name, style, stars)
VALUES
('McDonalds', 'Fast Burger', 4),
('Burger King', 'Fast Burger', 3),
('Pizza Hut', 'Fast Pizza', 2),
('KFC', 'Fast Chicken', 1),
('Papa Johns', 'Slow Pizza', 5),
('Subway', 'Fast Sandwich', 4),
('Wendys', 'Fast Everything', 3),
('Taco Bell', 'Fast Tacos', 2),
('Chipotle', 'Fast Burritos', 1),
('Poke Bowl', 'Fast Fish', 5)