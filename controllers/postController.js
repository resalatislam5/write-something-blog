const jwt = require('jsonwebtoken')
const { validationResult } = require("express-validator");
const Post = require("../model/Post");
const validationErrorFormatter = require("../utils/validationErrorFormatter");
const Profile = require('../model/Profile');

//Get All Post
module.exports.getAllPostController = async(req, res) =>{
    const post = await Post.find()
    res.json(post)
}

//Get One User Post
module.exports.getUserPostController = (req, res) =>{
    jwt.verify(req.tokan, process.env.SECRET_KEY, async (err, decoded) => {
        try {
            const profile = await Profile.findOne({user: decoded._id})
            const posts = await Post.find({ _id: profile.post })
            console.log(posts);
            res.json(posts)
        } catch (err) {

        }
})
}
//Get user Single Post with id
module.exports.getUserOnePostController = (req, res) =>{
    const {id} = req.params;

    jwt.verify(req.tokan, process.env.SECRET_KEY, async (err, decoded) => {
        try {
            const posts = await Post.findOne({ _id: id })
            console.log(posts);

            res.json(posts)
        } catch (err) {

        }
})
}
//Get Single Post with id no jwt need
module.exports.getOnePostController = async(req, res) =>{
    const {id} = req.params;
    const posts = await Post.findOne({ _id: id }).populate({
        path: 'author',
        select: 'name image'
    })
    .populate([{
        path: 'comments',
        populate:{
            path: 'user',
            select: 'name image',
        }
    }
])
    .populate([{
        path: 'comments',
        populate: {
            path: 'reply.user',
            select: 'name image'
        } 
    }
])
    console.log(posts);
    res.json(posts) 
}
//Edit Single Post with id
module.exports.putSingleUserPostController = (req, res) =>{
    const {id} = req.params;
    const { title, body, tags, thumbnail } = req.body;
    const result = validationResult(req).formatWith(validationErrorFormatter)
    if (!result.isEmpty()) {
        return res.json({ "error": result.mapped() })
    }
    jwt.verify(req.tokan, process.env.SECRET_KEY, async (err, decoded) => {
        if (err) {
            return res.json({ error: 'Something was wrong' })
        }
        try {
            const checkAuthor = await Post.findOne({author: decoded._id, _id: id})
            if(!checkAuthor){
                return res.json({ error: 'Something was wrong' })  
            }
            const post = await Post.findOneAndUpdate(
                { _id: id }, 
                {$set: {title,body,thumbnail, tags }},
                { new: true }
                )
                const newPost = await post.save();
            console.log('new post', newPost);
            
            res.json({ message: 'Post Edit Successfully' })
        } catch (err) {

        }
})
}
//Delete Single Post with id
module.exports.deleteSingleUserPostController = (req, res) =>{
    const {id} = req.params;
    jwt.verify(req.tokan, process.env.SECRET_KEY, async (err, decoded) => {
        if (err) {
            return res.json({ error: 'Something was wrong' })
        }
        try {
            const checkAuthor = await Post.findOne({author: decoded._id, _id: id})
            if(!checkAuthor){
                return res.json({ error: 'Something was wrong' })  
            }
            await Post.findOneAndDelete({ _id: id })
            await Profile.findOneAndUpdate(
                {user : decoded._id},
                {$pull: {'post': id}}
            )
            res.json({ message: 'Post Delete Successfully' })
        } catch (err) {
            res.json({ error: 'Something was wrong' }) 
        }
})
}
//Post User Post 
module.exports.postSinglePost = (req, res) =>{
    const { title, body, tags, thumbnail } = req.body
    const result = validationResult(req).formatWith(validationErrorFormatter)
    if (!result.isEmpty()) {
        return res.json({ "error": result.mapped() })
    }
    jwt.verify(req.tokan, process.env.SECRET_KEY, async (err, decoded) => {
        if (err) {
            return res.json({ error: 'Something was wrong' })
        }
        try {

            const PostModel = new Post({
                title,
                body,
                author: decoded._id,
                thumbnail,
                tags: tags.split(',')
            })
            let createPost = await PostModel.save();
            await Profile.findOneAndUpdate(
                {user : decoded._id},
                {$push: {'post': createPost._id}}
                )
            res.json({ message: 'Post Edit Successfully' })
        } catch (err) {
            res.json({ error: 'Something was wrong' })
        }
    })
}