require('dotenv').config();
const jwt = require('jsonwebtoken');

const generateToken = (admin) => {
    return jwt.sign({username: admin.username}, process.env.TOKEN_SECRET, { expiresIn: '1d' })
}

module.exports = generateToken;