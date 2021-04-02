const User = require('../models/userSchema');
const jwt = require('jsonwebtoken');

exports.signUpController = (req, res) => {
    const { name, email, password } = req.body;

    User.find({email: email})
    .exec((err , user) => {
        if(err || !user){
            return res.status(500).json({
                message: "Internal Error."
            })
        }

        if (user.length === 0){
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
                    response: 1,
                    name: user.name,
                    token: token
                })
            })
        } else {
            return res.status(200).json({
                response: 0,
                message: "Account Already Exists"
            })
        }
    })
}

exports.loginController = (req, res) => {
    const { email, password } = req.body

    User.find({email: email})
    .exec((err ,user) => {
        if(err || !user){
            return res.status(500).json({
                message: "Internal Error"
            })
        }

        if(user.length === 1) {
            if(!user[0].authenticate(password)){
                return res.status(200).json({
                    response : 0
                })
            } else {
                const { _id, name, email } = user;
    
                const token = jwt.sign({
                    _id,
                    name,
                    email
                }, process.env.JWT_TOKEN_SIGN, {
                    expiresIn: '60m'
                })
    
                return res.status(200).json({
                    response: 1,
                    name: user.name,
                    token: token
                })
            }
        } else if(user.length === 0){
            return res.status(200).json({
                response: 0
            })
        }else {
            return res.status(400).json({
                message: "Invalid Request"
            })
        }
    })
}