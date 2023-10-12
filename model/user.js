const {Schema, model} = require('mongoose');
const userSchema = new Schema({
    name:{
        type: String,
        required: true,
        maxlangth: 30,
        trim : true,
    },
    email:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
        minlangth: 8
    },
    profile:{
        type: Schema.Types.ObjectId,
        ref: 'Profile'
    },
    image : {
        type: String,
        default: 'https://i.ibb.co/FXJxQ80/images.png'
    }
},{
    timestamps: true
})

const User = model('User', userSchema)
module.exports = User