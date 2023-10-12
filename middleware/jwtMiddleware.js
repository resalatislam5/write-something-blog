exports.verifyToken = (req,res, next) =>{
    const bearerHeader = req.headers['authorizantion'];
    if(bearerHeader != 'undefined'){
        const bearer = bearerHeader.split(' ')
        const tokan = bearer[1]
        req.tokan = tokan
        next()
    }else{
        res.json({
            error: 'Token is not valid'
        })
    }
}