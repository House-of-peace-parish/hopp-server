const { getSocket } = require("../../config/connection");
const Event = require("../../model/event");

const editEvent = async (req, res) => {
    const { id } = req.params;
    const { ...otherData } = req.body;
    if (!id) {
        res.status(400).json({
            message: 'Id is required'
        })
    }

    try {
        const updateId = await Event.findByIdAndUpdate(id, { ...otherData }, { new: true, runValidators: true });
        if (!updateId) {
            return res.status(404).json({
                message: 'Id doesn\'t couldn\'nt be found'
            })
        }

        const io = getSocket();
        if (io) {
            io.to('hopp').emit('updated_event', updateId)
        }

        res.status(200).json({
            message: 'Event updated successfully',
            data: updateId
        })
    } catch(error) {
        res.status(500).json({
            error: error.message
        })
    }
}

module.exports = editEvent