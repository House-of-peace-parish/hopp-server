const mongoose = require('mongoose')

const volunteerSchema = new mongoose.Schema({
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
    volunteer: {
        type: String,
        required: true
    },
}, { timestamps: true })

const Volunteer = mongoose.model('Volunteer', volunteerSchema);
module.exports = Volunteer