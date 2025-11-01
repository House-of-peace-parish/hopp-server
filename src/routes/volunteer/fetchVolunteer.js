const Volunteer = require("../../model/volunteer");

const fetchVolunteer = async (req, res) => {
    try {
        const volunteerData = await Volunteer.find().sort({ createdAt: -1 });
        if (!volunteerData.length) {
            return res.status(404).json({ message: 'No data found', data: [] });
        }

        return res.status(200).json({
            message: `Volunteer data requests fetched successfully`,
            data: volunteerData,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error);
    }
};

module.exports = fetchVolunteer