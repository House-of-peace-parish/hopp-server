const mongoose = require('mongoose')

const welfareSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    pickUp: {
        type: String,
        required: true
    }
}, { timestamps: true })

const Welfare = mongoose.model('Welfare', welfareSchema);
module.exports = Welfare