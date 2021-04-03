require('dotenv').config({
    path:'./config/config.env'
});

const connectDB = require('./config/db');

const express = require('express');
const cors = require('cors');
const socket = require('socket.io');

const authRouter = require('./routes/authRouter.js');

connectDB();

const app = express();
const io = socket(app);

app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000"
}))

app.use('/auth', authRouter);

let participants = [];

io.on('connection', socket => {
    socket.on("joinedChat", (username) => {
        const user = {
            username,
            id: socket.id
        }
        participants.push(user)
        io.emit("newUser", participants);
    })

    socket.on("joinedRoom", (roomName, cb) => {
        socket.join(roomName);
        cb(messages[roomName]);
    })

    socket.on("sendMessage", ({message, to, sender}) => {
        const payload = {
            message,
            chatName: sender,
            sender
        }
        socket.to(to).emit("newMessage", payload);
    })

    socket.on("disconnect", () => {
        participants = participants.filter(u => u.id !== socket.id);
        io.emit("newUser", participants)
    })
})

app.listen(3001, (req, res, next) => {
    console.log("Server listening on port assigned");
})