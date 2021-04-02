require('dotenv').config({
    path:'./config/config.env'
});

const connectDB = require('./config/db');

const express = require('express');
const cors = require('cors');

const authRouter = require('./routes/authRouter.js');

connectDB();

const app = express();

app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000"
}))

app.use('/auth', authRouter);

app.listen(3001, (req, res, next) => {
    console.log("Server listening on port assigned");
})