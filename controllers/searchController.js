const Post = require("../model/Post")

exports.searchResultGetController = async (req, res) =>{
    const {term} = req.query
    try{
        let posts = await Post.find({
            $text: {
                $search: term
            }
        }).populate({
            path: 'author',
            select: 'name image'
        }).limit(20)
        res.json(posts)
    }catch(e){
        res.json({"error": "Someting was wrong"})
    }
}