require('dotenv').config();
const mongoose = require('mongoose');
const http = require('http');
const { Server } = require("socket.io");
const socketHandler = require("./socketHandler");

let io;

const setSocket = (socketInstance) => {
    io = socketInstance
};

const getSocket = () => io;

const connection = ({ app, port }) => {
    const dbURL = process.env.MONGODB_URL;

    mongoose.connect(dbURL, { autoIndex: true }).then(() => {
        console.log('Connected to database');

        // Create http server
        const server = http.createServer(app);

        // Attach socket.io
        const io = new Server(server, {
            cors: {
                origin: '*'
            }
        });

        // Handle socket connection
        socketHandler(io);

        // Pass io into setSocket function
        setSocket(io);

        server.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        })
    }).catch((error) => {
        console.log("Database connection failed", error);
    })
};

module.exports = { connection, setSocket, getSocket };