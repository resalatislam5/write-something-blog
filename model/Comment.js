const {Schema, model} = require('mongoose');

const commentSchema = new Schema({
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    body:{
        type: String,
        required: true,
        trim: true
    },
    reply:[
        {
            body:{
                type: String,
                trim: true,
                required: true
            },
            user:{
                type: Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            createAt: {
                type: Date,
                default: new Date()
            }
        }
    ]
},{
    timestamps: true
})

const Comment = model('User', commentSchema);
module.exports = Comment;