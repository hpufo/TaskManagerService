const express = require('express');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const tasks = require('./routes/tasks');
const logger = require('./logger');

const app = express();
const port = process.env.PORT || 4000;
// Connecting to the database
//const dbConnString = `mongodb://localhost:27017/TaskManager${process.env.NODE_ENV === 'test' ? 'Test':''}`;
const dbConnString = process.env.MONGODB_URI || 'mongodb://user:qwerty9@ds259001.mlab.com:59001/heroku_5lz8d8ll';
const db = mongoose.connect(dbConnString, { useNewUrlParser: true })
  .catch(e => {logger.error(e.message)});

//Set the COR header to allow cross domain
app.use((req,res,next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next();
});
//logging
app.use(morgan('dev',{
  skip: (req,res) => res.statusCode < 400,
  stream: process.stderr
}));
app.use(morgan('dev',{
  skip: (req,res) => res.statusCode >= 400,
  stream: process.stdout
}));
// setting body parser middleware 
app.use(bodyParser.json());
// API routes
app.use('/api', tasks);
app.use(express.static('public'));
// Running the server
app.listen(port, () => {
	logger.info(`Listening on: http://localhost:${port}`)
})

module.exports = app; //for testing