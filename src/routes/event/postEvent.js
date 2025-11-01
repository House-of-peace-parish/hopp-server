const Event = require("../../model/event");
const { getSocket } = require("../../config/connection");

const postEvent = async (req, res) => {
    const { title, date, time, location, description, image } = req.body;
    if (!title || !date || time || !location || !description || !image) {
        res.status(404).json({
            message: 'All fields are required'
        })
    }

    try {
        const newEvent = await Event.create({
            title, date, time, location, description, image
        })

        const io = getSocket();
        if (io) {
            io.to('hopp').emit('new_event', newEvent)
        };

        res.status(200).json({
            message: 'Event created successfully',
            data: newEvent
        })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = postEvent;