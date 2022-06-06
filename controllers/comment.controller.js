

exports.postComment = async (req, res) => {
    const { postId, parentId, body } = req.body;
    try {
        const post = await Post.findOne({ _id: postId });
        if (parentId) {
            const comment = await Comment.findOne({ _id: parentId });
            const reply = new Comment({
                body,
                user: userId,
                parentComment: parentId,
                level: 2,
            });
            await reply.save();
            comment.replies.push(reply._id);
            await comment.save();
            res.status(201).send({ success: true, post });
        } else {
            const comment = new Comment({
                body,
                user: userId,
                level: 1,
            });
            await comment.save();
            post.comments.push(comment._id);
            await post.save();

            res.status(201).send({ success: true, post });
        }

    }
    catch (error) {
        return res.status(500).send({ success: false, message: error.message });
    }
}

exports.deleteComment = async (req, res) => {
    try {

    }
    catch (error) {

    }
}