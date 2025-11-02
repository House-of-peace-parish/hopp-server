module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log("User connected", socket.id);

        socket.on('join_room', (room) => {
            socket.join(room);
            
            console.log(`${socket.id} joined room: ${room}`);
            io.to(room).emit('user_joined', socket.id);
        })

        socket.on('leave_room', (room) => {
            socket.leave(room);

            io.to(room).emit('user_left', socket.id)
        })

        socket.on('disconnect', () => {
            io.emit('user_disconnected', socket.id);
        });
    })
}