const jwt = require('jsonwebtoken')
const Post = require("../model/Post")
const Profile = require("../model/Profile")

exports.bookMarkController = (req, res) => {
    const { id } = req.params
    jwt.verify(req.tokan, process.env.SECRET_KEY, async (err, decoded) => {
        if (err) {
            return res.json({ error: 'Something was wrong' })
        }
        try {
            const post = await Post.findById(id)
            const profile = await Profile.findOne({ user: decoded._id })
            if (post.bookmark.includes(decoded._id)) {
                await Post.findOneAndUpdate(
                    { _id: id },
                    { $pull: { "bookmark": decoded._id } }
                )
                return res.json({ message: 'Bookmark remove Successfully', bookmark: false })
            }
            if (profile.bookmark.includes(decoded._id)) {
                await Profile.findOneAndUpdate(
                    { user: decoded.id },
                    { $pull: { "bookmark": decoded._id } }
                )
            }
            await Post.findOneAndUpdate(
                { _id: id },
                { $push: { 'bookmark': decoded._id } }
            )
            await Profile.findOneAndUpdate(
                { user: decoded._id },
                { $push: { 'bookmark': decoded._id } }
            )
            res.json({ message: 'Bookmark Successfully', bookmark: true })
        } catch (err) {
            return res.json({ error: 'Something was wrong' })
        }
    })
}
