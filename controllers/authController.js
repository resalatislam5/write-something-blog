const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const User = require("../model/User");
const validationErrorFormatter = require('../utils/validationErrorFormatter');
const Profile = require('../model/Profile');

exports.signupPostController = async (req, res, next) => {
    const result = validationResult(req).formatWith(validationErrorFormatter)
    if(!result.isEmpty()){
        console.log(result.mapped());
        return res.json(result.mapped())
    }
       let { name, email, password } = req.body;
       try {
           let hashedPassword = await bcrypt.hash(password, 12)
           const userModel = new User({
               name,
               email,
               password: hashedPassword
           })
           let createUser = await userModel.save();
           console.log(createUser);
           const user = {
               _id: createUser._id,
               name,
               email,
               image: createUser.image
           }
           const profile = new Profile({
               user: createUser._id
           })
           await profile.save()
           jwt.sign(user, process.env.SECRET_KEY, { expiresIn: '30d' }, (err, tokan) =>{
            console.log(tokan);
            if(err){
                res.json({"error": "Something was wrong"})
                return
            }
            res.json({ 'message': 'User creste success fully', tokan, user })
           })
       } catch (e) {
           console.log(e);
           next(e)
       }
}

exports.loginPostController = async(req, res, next) =>{
    let { email, password } = req.body;
    try{
        const userFind = await User.findOne({email})
        if(!userFind){
           return res.json({"message": "Invalid Credentail"})
        }
        const match = await bcrypt.compare(password, userFind.password);
        if(!match){
            return res.json({ "message": "Invaild Credential" })
        }
        const { name,  _id, image} = userFind
        const user = {
            _id,
            name,
            email,
            image
        }
        jwt.sign(user, process.env.SECRET_KEY, { expiresIn: '30d' }, (err, tokan) => {
            console.log(tokan);
            if (err) {
                return res.json({ "error": "Something was wrong" })
            }
            res.json({ tokan, user })
        }) 
    }catch(e){
        console.log(e);
        next()
    }
}