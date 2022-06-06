const { Schema, model } = require('mongoose');

const postSchema = Schema({
    title: { type: String, maxLength: 100 },
    content: { type: String, required: 'content is required', maxLength: 600 },
    image: String,
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: "Comment",
        },
    ],
    likes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    bookmarks: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    user: {
        type: Schema.ObjectId,
        ref: 'User',
        required: [true, "User id is required"]
    },
    viewCount: {
        type: Number,
        default: 0,
      },
}, { timestamps: true })

const Post = model("Post", postSchema);
module.exports = Post;