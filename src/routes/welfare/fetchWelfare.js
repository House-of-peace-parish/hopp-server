const Welfare = require('../../model/welfare');

const fetchWelfare = async (req, res) => {
    try {
        const welfareData = await Welfare.find().sort({ createdAt: -1 });
        if (!welfareData.length) {
            return res.status(404).json({ message: 'No data found', data: [] });
        }

        return res.status(200).json({
            message: `Welfare data requests fetched successfully`,
            data: welfareData,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error);
    }
};

module.exports = fetchWelfare