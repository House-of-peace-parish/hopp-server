const Contact = require('../../model/contact');

const fetchContactType = async (req, res) => {

    try {
        const requests = await Contact.find().sort({ createdAt: -1 });

        if (!requests.length) {
            return res.status(404).json({ message: 'No requests found', data: [] });
        }

        return res.status(200).json({
            message: `${reqType} requests fetched successfully`,
            data: requests,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error);
    }
};

module.exports = fetchContactType