const Post = require("../models/post.model");
const Comment = require("../models/comment.model");

exports.postComment = async (req, res) => {
    const { postId, parentId, body } = req.body;
    try {
        if (parentId) {
            const comment = await Comment.findOne({ _id: parentId });
            const reply = new Comment({
                body,
                user: req.userId,
                parentId: parentId,
            });
            await reply.save();
            comment.replies.push(reply._id);
            await comment.save();
            res.status(201).send({ success: true, comment });
        } else {
            const post = await Post.find({ _id: postId });
            console.log(post)
            const comment = new Comment({
                body,
                user: req.userId,
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