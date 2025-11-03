require('dotenv').config();

const Event = require("../../model/event");
const { getSocket } = require("../../config/connection");
const multer = require('multer');
const { storage } = require('../../config/firebaseConfig');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const upload = multer({
    storage: multer.memoryStorage(), // Use memory storage
});

const postEvent = async (req, res) => {
    const { title, date, time, location, description } = req.body;
    const image = req.file;

    if (!title || !date || time || !location || !description || !image) {
        res.status(404).json({
            message: 'All fields are required'
        })
    }

    try {
        if (!image) {
            return res.status(400).json({ error: 'No Image file uploaded.' });
        }

        const bucket = storage.bucket();
        const file = bucket.file(`image/${encodeURIComponent(image.originalname)}`);

        const stream = file.createWriteStream({
            metadata: {
                contentType: image.mimetype
            }
        });

        stream.on('error', (err) => {
            return res.status(500).json({ error: 'Failed to upload file', details: err.message });
        })

        stream.on('finish', async () => {
            const fileUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(file.name)}?alt=media`;

            const newEvent = await Event.create({
                title, date, time, location, description, image: fileUrl
            })

            const io = getSocket();
            if (io) {
                io.to('hopp').emit('new_event', newEvent)
            };

            res.status(200).json({
                message: 'Event created successfully',
                data: newEvent
            })
        })

        stream.end(image.buffer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { postEvent, upload };