const jwt = require('jsonwebtoken')
const Post = require("../model/Post")

exports.likePostController = (req, res) =>{
    const {id} = req.params;
    jwt.verify(req.tokan, process.env.SECRET_KEY, async (err, decoded) => {
        if (err) {
            return res.json({ error: 'Something was wrong' })
        }
        try {
            const post = await Post.findOne({_id : id})
            if(post.likes.includes(decoded._id)){
                await Post.findOneAndUpdate(
                    {_id: id},
                    { $pull: {"likes": decoded._id}}
                )
               return res.json({ message: 'Like remove Successfully',like: false })  
            }
            if (post.dislikes.includes(decoded._id)){
                await Post.findOneAndUpdate(
                    { _id: id },
                    { $pull: { "dislikes": decoded._id } }
                )
            }
            await Post.findOneAndUpdate(
                { _id: id },
                { $push: { 'likes': decoded._id } }
            )
            res.json({ message: 'Like Successfully', like: true })
        } catch (err) {
           return res.json({ error: 'Something was wrong' }) 
        }
    })
}
