const Post = require('../models/post.model');

/* 
* this functions returns all the posts 
* GET request at /posts
*/
exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });

        // if no videos found return 404
        if (!posts && posts.length === 0)
            return res
                .status(404)
                .send({ success: false, message: "No posts found" });

        // return all videos
        res.status(200).send({ success: true, posts });
    }
    catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

/* 
* this functions returns all the posts 
* GET request at /posts
*/
exports.getPost = async (req, res) => {
    const { postId } = req.params;
    try {
        const post = await Post.findById(postId, {}, { lean: true }).populate(
            "user",
            "name photo"
        );
        if (!post)
            return res
                .status(404)
                .send({ success: false, message: "No post found with this id" });

        res.status(200).send({ success: true, post });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

/* 
* this functions creates a new post
* POST request at /posts
*/
exports.createPosts = async (req, res) => {
    const { title, content, } = req.body;
    if (!content)
        return res
            .status(400)
            .send({ success: false, message: "Please write something" });
    try {
        let imageResponse = {};
        console.log(req)
        const post = await Post.create({
            postedBy: req.userId,
            content,
        });
        res.status(201).send({ success: true, post });
    }
    catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}


exports.editPost = async (req, res) => {
    const { postId } = req.params;
    const { title, content, } = req.body;
    if (!content)
        return res
            .status(400)
            .send({ success: false, message: "Please write something" });
    try {

        const postObj = {
            content
        };
        const post = await Post.findByIdAndUpdate({ _id: postId }, postObj, { new: true });
        res.status(201).send({ success: true, post });
    }
    catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

exports.deletePost = async (req, res) => {
    const { postId } = req.params;
    try {
        const post = await Post.findByIdAndDelete({ _id: postId });
        if (!post)
            return res
                .status(404)
                .send({ success: false, message: "No posts found for this user id" });

        res.status(200).send({ success: true, post });
    }
    catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}
