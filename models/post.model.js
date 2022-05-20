import mongoose from 'mongoose';

export const postSchema = mongoose.Schema({
    title: String,
    content: String,
    image: String,
    comments: [String],
    likes: {
        likCount: { type: Number, default: 0 }
    },
    createdAt: { type: Date, default: new Date() }
})

const Post = mongoose.model("Post", postSchema);
export default Post;