const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator')
const User = require("../model/User");
const validationErrorFormatter = require('../utils/validationErrorFormatter');

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
               name,
               email
           }
           req.session.user = user  
           const cookie = req.session
           console.log('User creste success fully');
           res.json({ 'message': 'User creste success fully', cookie })
       } catch (e) {
           console.log(e);
           next(e)
       }
}

exports.loginPostController = async(req, res, next) =>{
    console.log(req.body);
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
        const { name } = userFind
        const user = {
            name,
            email
        }
        req.session.user = user  
        const cookie = req.session

        res.json({user, cookie})
    }catch(e){
        console.log(e);
        next()
    }
}
exports.logoutController = (req, res, next) =>{

}