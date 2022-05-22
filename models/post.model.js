const { Schema, model } = require('mongoose');

const postSchema = Schema({
    title: { type: String, required: 'title is required', maxLength: 100 },
    content: { type: String, required: 'content is required', maxLength: 600 },
    image: {
        secure_url: {
            data: Buffer,
            contentType: String
        }
    },
    comments: [{
        text: String,
        created: { type: Date, default: Date.now },
        postedBy: { type: Schema.ObjectId, ref: 'User' }
    }],
    likes: {
        likCount: { type: Number, default: 0 }
    },
    postedBy: { type: Schema.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: new Date() }
})

const Post = model("Post", postSchema);
module.exports = Post;