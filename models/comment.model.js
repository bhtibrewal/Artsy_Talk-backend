const { Schema, model } = require('mongoose');

const commentSchema = Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User id is require for adding like"],
    },
    body: {
        type: String,
        required: [true, "Write something"],
    },
    replies: [
        {
            type: Schema.Types.ObjectId,
            ref: "Comment",
        },
    ],

})

module.exports = model("Comment", commentSchema);