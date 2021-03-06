const express = require('express');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const tasks = require('./routes/tasks');
const logger = require('./logger');
const config = require('./config');

const app = express();
const port = process.env.PORT || 4000;

const dbConnString = process.env.NODE_ENV === 'test' ? config.TEST_DB:config.DB;
const db = mongoose.connect(dbConnString, { useNewUrlParser: true })
  .catch(e => logger.error(e.message));

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
	logger.info(`Listening on new: http://localhost:${port}`)
})

module.exports = app; //for testing