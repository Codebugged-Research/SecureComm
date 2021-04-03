require('dotenv').config({
    path:'./config/config.env'
});

const connectDB = require('./config/db');

const express = require('express');
const cors = require('cors');
const socket = require('socket.io');
const http = require('http');

const authRouter = require('./routes/authRouter.js');
const fileRouter = require('./routes/fileRouter.js');

connectDB();

const app = express();

const server = http.createServer(app);
const io = socket(server,{
    cors: {
        origin: "http://localhost:3000"
    }
});

app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000"
}))

app.use('/auth', authRouter);
app.use('/file', fileRouter);

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

    socket.on("sendMessage", ({message, to, type, name, fileName, sender}) => {
        const payload = {
            message,
            chatName: sender,
            sender,
            type,
            name,
            fileName
        }
        socket.to(to).emit("newMessage", payload);
    })

    socket.on("disconnect", () => {
        participants = participants.filter(u => u.id !== socket.id);
        io.emit("newUser", participants)
    })
})
server.listen(3001, (req, res, next) => {
    console.log("Server listening on port assigned");
})