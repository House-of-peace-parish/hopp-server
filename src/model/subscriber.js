const mongoose = require('mongoose')

const subscriberSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
}, { timestamps: true })

const Subscriber = mongoose.model('Subscriber', subscriberSchema);
module.exports = Subscriber