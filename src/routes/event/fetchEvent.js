const Event = require("../../model/event");

const fetchEvent = async (req, res) => {
    try {
        const event = await Event.find().sort({ createdAt: -1 });
        if (!event.length) {
            return res.status(404).json({ message: 'No data found', data: [] });
        }

        res.status(200).json({
            message: 'Data fetched successfully',
            data: event
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

module.exports = fetchEvent;