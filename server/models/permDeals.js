var mongoose = require('mongoose');

var permDeal = mongoose.model('permDeals', {
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
    salary: {
        type: Number
    },
    fee: {
        type: Number,
        required: true
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

module.exports = { permDeal };