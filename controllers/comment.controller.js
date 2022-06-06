const Post = require("../models/post.model");

exports.postComment = async (req, res) => {
    const { postId, parentId, body } = req.body;
    try {
        if (parentId) {
            const comment = await Comment.findOne({ _id: parentId });
            const reply = new Comment({
                body,
                user: userId,
                parentId: parentId,
            });
            await reply.save();
            comment.replies.push(reply._id);
            await comment.save();
            res.status(201).send({ success: true, comment });
        } else {
            const post = await Post.findOne({ _id: postId });
            const comment = new Comment({
                body,
                user: userId,
                level: 1,
            });
            await comment.save();
            post.comments.push(comment._id);
            await post.save();

            res.status(201).send({ success: true, comment });
        }

    }
    catch (error) {
        return res.status(500).send({ success: false, message: error.message });
    }
}

exports.deleteComment = async (req, res) => {
    const { commentId, postId, parentCommentId } = req.body;
    try {


    }
    catch (error) {

    }
}