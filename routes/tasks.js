const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Task = require('../models/task');
const logger = require('../logger');

router.get('/tasks', (req,res,next) => {
  Task.find({})
    .then((tasks) => {
      res.send(tasks);
    })
    .catch(e => {
      logger.error(e.message);
      res.status(418).send(e.message);
    });
});

router.post('/tasks', (req,res,next) => {
  Task.create(req.body)
  .then((task) => {
    res.send(task);
  })
  .catch(e => {
    logger.error(e.message);
    res.status(400).send(e.message);
  });
});

router.put('/tasks/:_id', (req,res,next) => {
  Task.findByIdAndUpdate(req.params._id, req.body)
    .then((response) => {
      res.send(response);
    })
    .catch(e => {
      logger.error(e.message);
      res.status(400).send(e.message);
    });
});
router.delete('/tasks/:_id', (req,res,next) => {
  Task.findByIdAndRemove(req.params._id)
  .then((response) => {
    res.send(response);
  })
  .catch(e => {
    logger.error(e.message);
    res.status(400).send(e.message);
  });
});
module.exports = router;