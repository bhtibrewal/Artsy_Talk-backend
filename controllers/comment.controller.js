const Post = require("../models/post.model");
const Comment = require("../models/comment.model");

exports.getAllComments = async (req, res) => {
    try {
        const comments = await Comment.find().sort({ createdAt: -1 });
        if (!comments)
            return res
                .status(404)
                .send({ success: false, message: "No comments found" });

        res.status(200).send({ success: true, comments });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

exports.postComment = async (req, res) => {
    const { postId, parentId, body } = req.body;
    try {

        if (parentId) {
            const comment = await Comment.findById({ _id: parentId });
            const reply = await Comment.create({
                body,
                user: req.userId,
            });
            console.log(comment)
            comment.replies.push(reply);
            await Comment.findByIdAndUpdate({ _id: postId }, comment)

            res.status(201).send({ success: true, comment });
        }
        else {
            const post = await Post.findById({ _id: postId });
            const comment = await Comment.create({
                body,
                user: req.userId,
            })
            console.log(comment, post.comments)
            post.comments.push(comment);
            await Post.findByIdAndUpdate({ _id: postId }, post)

            res.status(201).send({ success: true, post });
        }

    }
    catch (error) {
        return res.status(500).send({ success: false, message: error.message });
    }
}

exports.deleteComment = async (req, res) => {
    const { commentId, postId, parentCommentId } = req.body;
    try {
        if (parentCommentId) {
            const comment = await Comment.findById({ _id: parentCommentId });

            console.log(comment)
            comment.replies.filter(id => id.valueOf() !== commentId);
            await Comment.findByIdAndUpdate({ _id: postId }, comment)

            res.status(201).send({ success: true, comment });
        }
        else {
            const post = await Post.findById({ _id: postId });

            console.log(post.comments)
            post.comments.filter(id => id.valueOf() === commentId);
            await Post.findByIdAndUpdate({ _id: postId }, post)

            res.status(201).send({ success: true, post });
        }

    }
    catch (error) {
        return res.status(500).send({ success: false, message: error.message });
    }
}