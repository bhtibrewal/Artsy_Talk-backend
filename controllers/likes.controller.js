const Post = require('../models/post.model');

exports.likePost = async (req, res) => {
    const { postId } = req.params;
    if (!postId)
        return res.status(400).send({ success: false, error: "Provide a post ID" });

    try {
        const post = await Post.findById({ _id: postId });

        const isLiked = post.likes.some(userId => userId.valueOf() === req.userId);
        if (isLiked)
            return res.status(400).send({ sucess: false, error: "The Post is Already liked" })

        post.likes.push(req.userId);

        await Post
            .findByIdAndUpdate({ _id: postId }, post, { new: true })

        res.status(201).send({ success: true, post });
    }
    catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

exports.dislikePost = async (req, res) => {
    const { postId } = req.params;
    if (!postId)
        return res.status(400).send({ success: false, error: "Provide a post ID" });

    try {
        const post = await Post.findById({ _id: postId });

        const isLiked = post.likes.some(userId => userId.valueOf() === req.userId);
        if (!isLiked)
            return res.status(400).send({ sucess: false, error: "The Post is Already liked" })

        

    }
    catch {

    }
}