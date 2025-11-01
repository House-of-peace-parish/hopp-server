const Contact = require('../../model/contact');
const { getSocket } = require('../../config/connection');

const postContact = async (req, res) => {
    const { firstName, lastName, email, phone, message, reqType } = req.body;
    if (!firstName || !lastName || !email || !phone || !message || !reqType) {
        res.status(400).json({
            message: 'All fields are required'
        })
    }

    try {
        const newContact = await Contact.create({
            firstName, lastName, email, phone, message, reqType
        })

        const io = getSocket();
        if(io) {
            io.to('hopp').emit('contact_request', newContact)
        }

        res.status(201).json({
            message: 'Thank you for contacting House of Peace Parish. A confirmation email has been sent to your inbox.',
            data: newContact
        })
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error);
    }
};

module.exports = postContact;