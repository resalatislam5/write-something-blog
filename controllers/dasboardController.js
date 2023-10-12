const jwt = require('jsonwebtoken') 
const User = require("../model/User")
const { validationResult } = require('express-validator')
const validationErrorFormatter = require('../utils/validationErrorFormatter')
const Profile = require('../model/Profile')

exports.dasboardController = async(req, res) =>{

    res.json('success')
}
exports.getProfile = async(req, res) =>{
    jwt.verify(req.tokan, process.env.SECRET_KEY, async (err, decoded) => {
        if (err) {
            return res.json({ 'error': 'Something wass wrong' })
        }
        console.log(decoded);
        
        try {
            const profile = await Profile.findOne({user: decoded._id})
            if(profile){
                res.json(profile)
                console.log('Profile', profile);
            }
            res.json({ error: 'Profile not create' })
            console.log(profile);
        } catch (err) {
            console.log(err);
        }
    })
}
exports.editProfile = async (req, res) =>{
    const {image, title, bio, name, website, facebook, twiter, github} = req.body
    const result = validationResult(req).formatWith(validationErrorFormatter)
    if (!result.isEmpty()) {
        console.log(result.mapped());
        return res.json({"error" : result.mapped()})
    }
    jwt.verify(req.tokan, process.env.SECRET_KEY, async(err, decoded) =>{
        if(err){
            return res.json({'error': 'Something wass wrong'})
        }
        const profile = await Profile.findOne({user: decoded._id})
        if(profile){
            const profileInfo = {
                user: decoded._id,
                image,
                title,
                bio,
                links: {
                    website: website || '',
                    facebook: facebook || '',
                    twiter: twiter || '',
                    github: github || ''
                }
            }
            await Profile.findOneAndUpdate(
                {user: decoded._id},
                { $set: profileInfo },
                {new: true}
            )
            console.log('profileInfo', profileInfo);
            res.json({ message: 'Profile Edit Successfully' })
            return
        }
        try{

            const profile = new Profile({
                user: decoded._id,
                image,
                name,
                title,
                bio,
                links: {
                    website: website || '',
                    facebook: facebook || '',
                    twiter: twiter || '',
                    github: github || ''
                }
            })
            const createdProfile = await profile.save()
            await User.findOneAndUpdate(
                {_id: decoded._id},
                {$set: {profile: createdProfile._id, image: image, name:name}}
            )
            res.json({message : 'Profile Edit Successfully'})
        }catch(err){

        }
    })
}