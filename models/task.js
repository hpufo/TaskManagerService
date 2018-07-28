const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create task schema and model
const TaskSchema = new Schema({
  completed: {
    type: Boolean,
    required: [true, "completed field is required"]
  },
  name: {
    type: String,
    required: [true, 'name field is required']
  },
  due: {
    type: Date,
    required: [true, 'due field is required']
  },
  description: {
    type: String,
    required: [true, 'description field is required']
  }
});

const Task = mongoose.model('task', TaskSchema);

module.exports = Task;