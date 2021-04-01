const mongoose = require('mongoose');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        trim: true
    },
    hashed_password:{
        type: String,
        required: true
    },
    salt:{
        type: String
    }
},{
    timestamps: true
})

userSchema.virtual('password')
    .set(function(password){
        this._password = password
        this.salt = this.makeSalt()
        this.hashed_password = this.encryptPassword(password)
    })
    .get(function (){
        return this._password
    })

userSchema.methods = {
    makeSalt: function() {
        return Math.round(new Date().valueOf()*Math.random()) + ''
    },
    encryptPassword: function(password) {
        if(!password) return ''
        try{
            return crypto.createHmac('sha1', this.salt)
            .update(password)
            .digest('hex')
        } catch(err) {
            return ''
        }
    },
    authenticate: function(plainPassword){
        return this.encryptPassword(plainPassword) === this.hashed_password
    }
}

module.exports = mongoose.model('User', userSchema);