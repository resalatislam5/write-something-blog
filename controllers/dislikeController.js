const jwt = require('jsonwebtoken')
const Post = require("../model/Post")

exports.dislikesPostController = (req, res) => {
    const { id } = req.params
    jwt.verify(req.tokan, process.env.SECRET_KEY, async (err, decoded) => {
        if (err) {
            return res.json({ error: 'Something was wrong' })
        }
        try {
            const post = await Post.findById(id)
            if (post.likes.includes(decoded._id)) {
                await Post.findOneAndUpdate(
                    { _id: id },
                    { $pull: { "likes": decoded._id } }
                )
            }
            if (post.dislikes.includes(decoded._id)) { 
                await Post.findOneAndUpdate(
                    { _id: id },
                    { $pull: { "dislikes": decoded._id } }
                )
                return res.json({ message: 'DisLike remove Successfully', dislike: false })
            }
            await Post.findOneAndUpdate(
                { _id: id },
                { $push: { 'dislikes': decoded._id } }
            )
            res.json({ message: 'dislikes Successfully', dislike: true })
        } catch (err) {
            return res.json({ error: 'Something was wrong' })
        }
    })
}
