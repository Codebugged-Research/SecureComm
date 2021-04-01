const User = require('../models/userSchema');
const jwt = require('jsonwebtoken');

exports.signUpController = (req, res) => {
    const { name, email, password } = req.body;
    
    const user = new User({
        name: name,
        email: email,
        password: password
    })

    user.save((err, user)=> {
        if(err || !user){
            return res.status(500).json({
                message: "Internal Server Error"
            })
        }

        const { _id, name, email } = user;

        const token = jwt.sign({
            _id,
            name,
            email
        }, process.env.JWT_TOKEN_SIGN, {
            expiresIn: '60m'
        })

        return res.status(200).json({
            id: user._id,
            name: user.name,
            token: token
        })
    })
}

exports.loginController = (req, res) => {
    return res.status(200);
}