const Subscriber = require("../../model/subscriber");

const fetchSubscribers = async (req, res) => {
    try {
        const subscriberData = await Subscriber.find().sort({ createdAt: -1 });
        if (!subscriberData.length) {
            return res.status(404).json({ message: 'No data found', data: [] });
        }

        return res.status(200).json({
            message: `Subscriber data requests fetched successfully`,
            data: subscriberData,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error);
    }
};

module.exports = fetchSubscribers