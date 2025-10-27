require('dotenv').config();
const Welfare = require('../../model/welfare');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const express = require('express');
const { getSocket } = require('../../config/connection');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_RECIEVER,
        pass: process.env.EMAIL_PWD
    }
})

const postWelfare = async (req, res) => {
    const { firstName, lastName, email, phone, date, pickUp } = req.body;
    if (!firstName || !lastName || !email || !phone || !date || !pickUp) {
        res.status(400).json({
            message: 'All fields are required'
        })
    }

    try {
        const newWelfare = await Welfare.create({
            firstName, lastName, email, phone, date, pickUp
        })

        const senderEmail = newWelfare.email;

        const mailOptions = {
            from: process.env.EMAIL_RECIEVER,
            to: senderEmail,
            subject: `${newWelfare.reqType} - House of Peace Parish`,
            text: `Thank you ${newWelfare.firstName} for reaching out to House of Peace Parish.\n\nOur team will get back to you shortly.\n\nBest regards,\nHouse of Peace Parish`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error occurred while sending email:', error);
                return res.status(500).json({ message: 'Account created, but email could not be sent.' });
            }
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