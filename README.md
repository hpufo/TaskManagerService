# TaskManagerService
API Documentation: https://shielded-retreat-82637.herokuapp.com/docs/index.html

To install depenencies: "npm install"

To run dev server: "npm start" or "node index.js"

DB info:
This service is set to run with my heroku database. You can add your own database by changing the DB connection string in config.js

Tests:
In order to run tests you will need a local mongodb database. Add your db connection string to TEST_DB in config.js then you can run tests with "npm test"

Note: My current docker-compose setup isn't working

Technology used: NodeJS, Express, MongoDB, Mongoose, Mocha, Chai, Morgan, Winston, Docker, SwaggerUI, and Heroku for deployment