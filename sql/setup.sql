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
  style TEXT
  );

INSERT into restaurants (name, style)
VALUES
('McDonalds', 'Fast Burger'),
('Burger King', 'Fast Burger'),
('Pizza Hut', 'Fast Pizza'),
('KFC', 'Fast Chicken'),
('Papa Johns', 'Slow Pizza'),
('Subway', 'Fast Sandwich'),
('Wendys', 'Fast Everything'),
('Taco Bell', 'Fast Tacos'),
('Chipotle', 'Fast Burritos'),
('Poke Bowl', 'Fast Fish');

DROP TABLE IF EXISTS reviews cascade;
CREATE TABLE reviews (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  restaurant_id BIGINT,
  user_id BIGINT,
  stars BIGINT,
  details TEXT,
  FOREIGN KEY (restaurant_id) REFERENCES restaurants(id),
  FOREIGN KEY (user_id) REFERENCES yawp_users(id)
);  
INSERT INTO reviews (restaurant_id, user_id, stars, details)
VALUES
('1', '2', '5', 'it was McFast'),
('1', '3', '5', 'I had it my way'),
('3', '1', '5', 'Happy with the Hut')