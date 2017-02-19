var mongoose = require('mongoose');

var Deal = mongoose.model('Deal', {
  name: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  client: {
    type: String,
    required: true,
    minlength: 1
  },
  isPerm: {
    type: Boolean,
    required: true
  },
  recruiter: {
    type: String,
    required: true
  },
  sales: {
    type: String,
    required: true
  },
  salary: {
    type: Number
  },
  isW2: {
    type: Boolean
  },
  payRate: {
    type: Number
  },
  billRate: {
    type: Number
  },
  startDate: {
    type: Number
  },
  isActive: {
    type: Boolean
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  },
  _creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
});

module.exports = {Deal};
