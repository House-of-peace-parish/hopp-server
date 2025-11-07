const Volunteer = require('../../model/volunteer');
const { getSocket } = require('../../config/connection');


const volunteerRead = async (req, res) => {
    const { volId } = req.params;
    const { read } = req.body;

    if (read === undefined) {
        return res.status(400).json({
            message: 'Read is required'
        })
    }

    try {
        const readUpdate = await Volunteer.findByIdAndUpdate(
            volId,
            { read },
            {
                new: true,
                runValidators: true
            }
        )
        if (!readUpdate) {
            return res.status(404).json({
                message: 'No volunteer exist for this data'
            })
        }

        const io = getSocket();
        if (io) {
            io.to('hopp').emit('volunteer_read', readUpdate)
        }

        res.status(200).json({
            message: 'Volunteer updated successfully',
            data: readUpdate
        })
    } catch(error) {
        res.status(500).json({
            error: error.message
        })
    }
}

module.exports = volunteerRead