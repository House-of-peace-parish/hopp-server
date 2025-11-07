const Contact = require('../../model/contact');
const { getSocket } = require('../../config/connection');


const contactRead = async (req, res) => {
    const { contactId } = req.params;
    const { read } = req.body;

    if (read === undefined) {
        return res.status(400).json({
            message: 'Read is required'
        })
    }

    try {
        const readUpdate = await Contact.findByIdAndUpdate(
            contactId,
            { read },
            {
                new: true,
                runValidators: true
            }
        )
        if (!readUpdate) {
            return res.status(404).json({
                message: 'No contact exist for this data'
            })
        }

        const io = getSocket();
        if (io) {
            io.to('hopp').emit('contact_read', readUpdate)
        }

        res.status(200).json({
            message: 'Contact updated successfully',
            data: readUpdate
        })
    } catch(error) {
        res.status(500).json({
            error: error.message
        })
    }
}

module.exports = contactRead