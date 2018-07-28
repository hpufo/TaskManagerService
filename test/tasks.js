process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require("mongoose");
const server = require('../index');
const should = chai.should();
const Task = require('../models/task');

chai.use(chaiHttp);

const path = '/api/tasks';
let task = {completed: false, name: 'test name', due: '2018-07-11', description: 'test description'};

describe('Tasks', () => {
  beforeEach((done) => {
    Task.remove({}, (err) => {
      done();
    });
  });

  describe('/GET task', () => {
    it('it should GET all the tasks', (done) => {
      Task.create([task,task,task])
      .then(() => {
        chai.request(server)
        .get(path)
        .end((err, res) => {
          res.should.has.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(3);
          done();
        });
      });
    });
  });

  describe('/POST task', () => {
    it('it should POST a task', (done) => {
      chai.request(server)
        .post(path).send(task)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('_id');
          res.body.should.have.property('completed').eql(task.completed);
          res.body.should.have.property('name').eql(task.name);
          res.body.should.have.property('due');
          res.body.should.have.property('description').eql(task.description);
          done();
        });
    });
    it('it should not POST a task without a completed field', (done) => {
      chai.request(server)
        .post(path)
        .send(Object.assign({}, task, {completed: ''}))
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
    //
    it('it should not POST a task without a name field', (done) => {
      chai.request(server)
        .post(path)
        .send(Object.assign({}, task, {name: ''}))
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
    it('it should not POST a task without a due field', (done) => {
      chai.request(server)
        .post(path)
        .send(Object.assign({}, task, {due: ''}))
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
    it('it should not POST a task without a description field', (done) => {
      chai.request(server)
        .post(path)
        .send(Object.assign({}, task, {description: ''}))
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });
  describe('/PUT task', () => {
    it('should PUT a new name', (done) => {
      Task.create(task)
        .then((task) => task._id)
        .then((_id) => {
          chai.request(server)
            .put(`${path}/${_id}`).send(Object.assign({}, task, {name: 'newName'}))
            .end((err, res) => {
              res.should.have.status(200);
              done();
            });
        });
    });
    it('should PUT a new completed value', (done) => {
      Task.create(task)
        .then((task) => task._id)
        .then((_id) => {
          chai.request(server)
            .put(`${path}/${_id}`).send(Object.assign({}, task, {completed: true}))
            .end((err, res) => {
              res.should.have.status(200);
              done();
            });
        });
    });
    it('should PUT a new due date', (done) => {
      Task.create(task)
        .then((task) => task._id)
        .then((_id) => {
          chai.request(server)
            .put(`${path}/${_id}`).send(Object.assign({}, task, {due: '2018-06-11'}))
            .end((err, res) => {
              res.should.have.status(200);
              done();
            });
        });
    });
    it('should PUT a description name', (done) => {
      Task.create(task)
        .then((task) => task._id)
        .then((_id) => {
          chai.request(server)
            .put(`${path}/${_id}`).send(Object.assign({}, task, {description: 'new description'}))
            .end((err, res) => {
              res.should.have.status(200);
              done();
            });
        });
    });
    it('should not PUT an invalid due date', (done) => {
      Task.create(task)
        .then((task) => task._id)
        .then((_id) => {
          chai.request(server)
            .put(`${path}/${_id}`).send(Object.assign({}, task, {due: 'string'}))
            .end((err, res) => {
              res.should.have.status(400);
              done();
            });
        });
    });
    it('should not PUT an invalid _id', (done) => {
      Task.create(task)
        .then((task) => task._id)
        .then((_id) => {
          chai.request(server)
            .put(`${path}/${_id}`).send(Object.assign({}, task, {_id: 'junk'}))
            .end((err, res) => {
              res.should.have.status(400);
              done();
            });
        });
    });
    it('should not PUT an invalid completed value', (done) => {
      Task.create(task)
        .then((task) => task._id)
        .then((_id) => {
          chai.request(server)
            .put(`${path}/${_id}`).send(Object.assign({}, task, {completed: 'junk'}))
            .end((err, res) => {
              res.should.have.status(400);
              done();
            });
        });
    });
  });

  describe('/DELETE', () => {
    it('should DELETE a task', (done) => {
      Task.create(task)
        .then((task) => task._id)
        .then((_id) => {
          chai.request(server)
            .del(`${path}/${_id}`)
            .end((err, res) => {
              res.should.has.status(200);;
              done();
            });
        });
    });
  });
});