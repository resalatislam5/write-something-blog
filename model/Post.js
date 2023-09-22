const {Schema, model} = require('mongoose')

const postSchema = new Schema({
    title:{
        type: String,
        trim: true,
        required: true,
        maxlangth: 100
    },
    body:{
        type: String,
        required: true,
    },
    auth:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        requird: true,
    },
    thumbnail: {
        type: [String],
        trim: true,
    },
    tags:{
        type: [String],
        trim: true,
        required: true
    },
    readTime: String,
    likes: [Schema.Types.ObjectId],
    dislikes: [Schema.Types.ObjectId],
    comments:[
        {
           type: Schema.Types.ObjectId,
           ref: 'Comment' 
        }
    ],

},{
    timestamps: true
})

const Post = model('Post', postSchema)
module.exports = Post