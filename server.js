const express = require('express');
const cors = require('cors');

const authRouter = require('./routes/authRouter.js');

const app = express();

app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000"
}))

app.use('/auth', authRouter);

app.listen(3000, (req, res, next) => {
    console.log("Server listening on port assigned");
})