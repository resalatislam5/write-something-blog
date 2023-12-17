const jwt = require('jsonwebtoken')
const Comment = require("../model/Comment");
const Post = require("../model/Post");

exports.CommentPostController = (req,res) =>{
    const {id} = req.params;
    const {body} = req.body;
    jwt.verify(req.tokan, process.env.SECRET_KEY, async(err, decoded) =>{
        if (err) {
            return res.json({ error: 'Something was wrong' })
        }
        try{
            const comment = new Comment({
                post : id,
                user: decoded._id,
                body,
                reply: []
            })
            const createdComment= await comment.save()
            await Post.findOneAndUpdate(
                {_id : id},
                { $push: { comments: createdComment._id}}
                )
            res.json({ message: 'Reply Successfully' })
        }catch{
            return res.json({ error: 'Something was wrong' })
        }
    }) 
}

exports.repliesCommentPostController = (req, res) =>{
    const { id } = req.params;
    const { body } = req.body;
    jwt.verify(req.tokan, process.env.SECRET_KEY, async (err, decoded) => {
        if (err) {
            return res.json({ error: 'Something was wrong' })
        }
        try {
            const replyValue = {
                body,
                user: decoded._id,
            }
            await Comment.findOneAndUpdate(
                {_id : id },
                { $push: { 'reply': replyValue } }
            )
            res.json({ message: 'Reply Successfully' })
        } catch (err) {
            res.json({ error: 'Something was wrong' })
        }
    })
}
