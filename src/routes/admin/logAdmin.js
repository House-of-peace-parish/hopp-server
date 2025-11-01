const generateToken = require("../../middleware/generateToken");

const logAdmin = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({
            message: "Username and Password is required"
        })
    }

    try {
        const adminCredential = {
            username: 'rccg.hop@yahoo.com',
            password: 'hop1234'
        }

        if (username !== adminCredential.username || password !== adminCredential.password) {
            return res.status(404).json({
                message: 'Username or password is incorrect'
            })
        }

        const token = generateToken(adminCredential);
        res.status(200).json({
            message: 'Welcome to HOP dashboard',
            data: adminCredential,
            token: token
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

module.exports = logAdmin;