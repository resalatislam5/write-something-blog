const User = require("../model/User");

exports.bindUserWithRequest  = () =>{
    return async  (req,res, next) =>{
        if(!req.session.isLoggedIn){
            return next()
        }
        try{
            const user = await User.findById(req.session.user_id)
            console.log('middleware', user);
            req.user = user
            next()
        }catch(e){
            console.log(e);
            next(e)
        }
    }
}