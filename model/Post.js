const {Schema, model} = require('mongoose')
const User = require('./User');
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
    author:{
        type: Schema.Types.ObjectId,
        ref: User,
        requird: true,
    },
    thumbnail: {
        type: String,
        trim: true,
    },
    tags:{
        type: [String],
        trim: true,
        required: true
    },
    readTime: String,
    likes: [{
        type: Schema.Types.ObjectId,
        ref: User,
    }],
    dislikes: [{
        type: Schema.Types.ObjectId,
        ref: User,
    }],
    comments:[
        {
           type: Schema.Types.ObjectId,
           ref: 'Comment' 
        }
    ],
    bookmark: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Post'
        }
    ]

},{
    timestamps: true
})

postSchema.index({
    title: 'text',
    body: 'text',
    tags: 'text'
},{
    weights:{
        title: 5,
        tag: 5,
        body: 2
    }
})

const Post = model('Post', postSchema)
module.exports = Post