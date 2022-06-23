const { Schema, model } = require('mongoose');

const postSchema = Schema({
    content: { type: String, required: 'content is required', maxLength: 600 },
    image: String,
    comments: [
        {
            body: {
                type: String,
                required: [true, "Write something"],
            },
            user: {
                type: Schema.Types.ObjectId,
                ref: "User",
                required: [true, "User id is require for adding like"],
            },
            replies: [
                {
                    body: {
                        type: String,
                        required: [true, "Write something"],
                    },
                    user: {
                        type: Schema.Types.ObjectId,
                        ref: "User",
                        required: [true, "User id is require for adding like"],
                    }
                }
            ]
        },
    ],
    likes: [
        Schema.Types.ObjectId,
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