const Post = require("../model/Post")
const moment = require('moment')
const User = require("../model/User")
const Profile = require("../model/Profile")
exports.featuredController = async(req, res) =>{
    let date = moment().subtract(30, 'days')
    date.toDate()
    const post = await Post.find({createdAt: {$gt : date}}).limit(2).populate({
        path: 'author',
        select: 'image name createdAt'
    });
    res.json(post)
}
exports.populerController = async(req, res) =>{
    const post = await Post.find().limit(4).populate({
        path: 'author',
        select: 'image name createdAt'
    });
    res.json(post)
}
exports.recentlyController = async(req, res) =>{
    const page = parseInt(req.query.page)
    console.log(page);
    const post = await Post.find()
    .skip(page)
    .limit(10)
    .populate({
        path: 'author',
        select: 'image name'
    });
    res.json(post)
}
exports.authorController = async(req,res) =>{
    const author = await Profile.find().populate({
        path: 'user',
        select: 'name'
    }).limit(3); 
    res.json(author)
}
