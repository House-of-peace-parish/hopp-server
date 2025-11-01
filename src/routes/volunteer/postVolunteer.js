const { getSocket } = require("../../config/connection");
const Volunteer = require("../../model/volunteer");

const postVolunteer = async (req, res) => {
    const { firstName, lastName, email, phone, volunteer } = req.body;
    if (!firstName || !lastName || !email || !phone || !volunteer) {
        res.status(400).json({
            message: 'All fields are required'
        })
    }

    try {
        // Find if volunteer exists
        const volunteerExist = await Volunteer.findOne({ email });
        if(volunteerExist) {
            return res.status(400).json({ message: 'volunteer with this email already exists' });
        }

        const newVolunteer = await Volunteer.create({
            firstName, lastName, email, phone, volunteer
        })

        const io = getSocket();
        if(io) {
            io.to('hopp').emit('new_volunteer', newVolunteer)
        }

        res.status(200).json({
            message: 'You\'ve subscribed successfully',
            data: newVolunteer
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    };
};

module.exports = postVolunteer;