const Welfare = require('../../model/welfare');
const { getSocket } = require('../../config/connection');

const postWelfare = async (req, res) => {
    const { firstName, lastName, email, phone, date, pickUp, read } = req.body;
    if (!firstName || !lastName || !email || !phone || !date || !pickUp) {
        res.status(400).json({
            message: 'All fields are required'
        })
    }

    try {
        const newWelfare = await Welfare.create({
            firstName, lastName, email, phone, date, pickUp, read
        })

        const io = getSocket();
        if(io) {
            io.to('hopp').emit('welfare_request', newWelfare)
        }

        res.status(201).json({
            message: 'Thank you for contacting House of Peace Parish. A confirmation email has been sent to your inbox.',
            data: newWelfare
        })
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error);
    }
};

module.exports = postWelfare;