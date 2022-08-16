# Template for Backend Express

The Golden Rule:
🦸 🦸‍♂️ Stop starting and start finishing. 🏁

If you work on more than one feature at a time, you are guaranteed to multiply your bugs and your anxiety.

## Scripts

| command                | description                                                                         |
| ---------------------- | ----------------------------------------------------------------------------------- |
| `npm start`            | starts the app - should only be used in production as changes will not get reloaded |
| `npm run start:watch`  | runs the app using `nodemon` which watches for changes and reloads the app          |
| `npm test`             | runs the tests once                                                                 |
| `npm run test:watch`   | continually watches and runs the tests when files are updated                       |
| `npm run setup-db`     | sets up the database locally                                                        |
| `npm run setup-heroku` | sets up the database on heroku                                                      |

                                                  |

**ToDoList**

- npm i
- remove .example form env file
- Setup SQL file - what tables an columns are req
  user table - reference
  github_users;
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  username TEXT NOT NULL,
  email TEXT,
  avatar TEXT

  );

      restaurant table (arbitrary) -
        id | name
      review table
        Foreign Keys (user ID, restaurant ID)
        user id | restaurant id | Stars | Detail

--[] npm run setup-db (will show any holes if written incorrectly)

Start at the Root App.js gets hit first

- set up cookie parser middleware and routes for restaurants and users

- Then app.js sends us to the controller

**controller || userService.js depending on the route** - login will go userService - Reviews for restaurants are not userService dependent

**User Routes** (the mores challenging)

- POST /api/v1/users
  Creates a new user - needs token(cookie)
  Should error if the email already exists
  Should immediately log in the user

  0.  authenticate lets you in the club

- POST /api/v1/users/sessions Logs in an existing user
  Should error if email / password don’t match
- GET /api/v1/users Shows list of users Protected
  must be admin 2
  authorized middleware here - for VIP

**Restaurant Routes**

- GET /api/v1/restaurants Shows list of restaurants Not Protected 2
- GET /api/v1/restaurants/:restId Shows restaurant detail Not Protected,
  Includes nested list of reviews 3
- POST /api/v1/restaurants/:restId/reviews Creates a new review Protected,
  defaults user_id to the logged in user.
  Body of request should have the following shape
  {stars: 5, detail: 'It was okay'}

-DELETE /api/v1/reviews/:id Deletes a review Protected –
must be an admin or the user who created the review 2

**Commit history showing vertical approach 4**
