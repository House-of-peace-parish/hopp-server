const { getSocket } = require("../../config/connection");
const Subscriber = require("../../model/subscriber");

const postSubscriber = async (req, res) => {
    const { fullName, email } = req.body;
    if (!fullName || !email) {
        res.status(400).json({
            message: 'All fields are required'
        })
    }

    try {
        // Find if subscriber exists
        const subscriberExist = await Subscriber.findOne({ email });
        if(subscriberExist) {
            return res.status(400).json({ message: 'Subscriber with this email already exists' });
        }

        const newSubscriber = await Subscriber.create({
            fullName, email
        })

        const io = getSocket();
        if(io) {
            io.to('hopp').emit('new_subscriber', newSubscriber)
        }

        res.status(200).json({
            message: 'You\'ve subscribed successfully',
            data: newSubscriber
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    };
};

module.exports = postSubscriber;