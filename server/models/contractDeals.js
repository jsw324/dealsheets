var mongoose = require('mongoose');

var contractDeal = mongoose.model('contractDeals', {
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
    recruiter: {
        type: String,
        required: true
    },
    sales: {
        type: String,
        required: true
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

module.exports = { contractDeal };