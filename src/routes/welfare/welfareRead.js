const Welfare = require('../../model/welfare');
const { getSocket } = require('../../config/connection');


const welfareRead = async (req, res) => {
    const { welId } = req.params;
    const { read } = req.body;

    if (read === undefined) {
        return res.status(400).json({
            message: 'Read is required'
        })
    }

    try {
        const readUpdate = await Welfare.findByIdAndUpdate(
            welId,
            { read },
            {
                new: true,
                runValidators: true
            }
        )
        if (!readUpdate) {
            return res.status(404).json({
                message: 'No welfare exist for this data'
            })
        }

        const io = getSocket();
        if (io) {
            io.to('hopp').emit('welfare_read', readUpdate)
        }

        res.status(200).json({
            message: 'Welfare updated successfully',
            data: readUpdate
        })
    } catch(error) {
        res.status(500).json({
            error: error.message
        })
    }
}

module.exports = welfareRead