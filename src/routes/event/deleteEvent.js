const { getSocket } = require("../../config/connection");
const Event = require("../../model/event");


const deleteEvent = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        res.status(400).json({
            message: 'Id is required'
        })
    }

    try {
        const deleteId = await Event.findByIdAndDelete(id);
        if (!deleteId) {
            return res.status(404).json({
                message: "Event not found"
            });
        }

        const io = getSocket();
        if(io) {
            io.to('hopp').emit('delete_event', deleteId)
        }

        res.status(200).json({
            message: 'Event deleted successfully',
            data: deleteId
        })
    } catch(error) {
        res.status(500).json({
            error: error.message
        })
    }
}

module.exports = deleteEvent