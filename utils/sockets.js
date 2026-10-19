const socket = require('socket.io')
const Message = require('../models/message.js')
const initializeSocket = (server) => {
    const io = socket(server, {
    cors : {
        origin: 'http://localhost:5173', // Specifically allow your frontend origin
        credentials: true, // Allow cookies and authorization headers to be sent
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed HTTP methods
        allowedHeaders: ['Content-Type', 'Authorization'] // Allowed headers in the request
    }
    })
    io.on("connection", (socket)=>{
        //handle connection events
        socket.on("joinChat",(data)=>{
            // Handle join chat event
            const roomId = data.targetUserId;
            socket.join(roomId);
        })
        socket.on("sendMessage",async (data)=>{
            // must send the message back to the room so that all users in the room can receive it
            const roomId = data.targetUserId;
            const payload = {
                existingUserId : data.existingUserId,
                existingUserName : data.existingUserName,
                message : data.message,
                time : new Date().toISOString()
            }
            socket.to(roomId).emit("receiveMessage",payload);
            const message = await Message.create(payload);
        })
        socket.on("disconnect",(reason)=>{
            console.log(`User disconnected: ${reason}`);
        })
    })
}
module.exports = {initializeSocket}