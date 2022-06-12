const cloudinary = require("cloudinary");
const Post = require('../models/post.model');

/* 
* this functions returns all the posts 
* GET request at /posts
*/
exports.getPosts = async (req, res) => {

    try {
        const posts = await Post.find()
            .populate("user", "name photo location")
            .sort({ createdAt: -1 });

        if (!posts && posts.length === 0)
            return res
                .status(404)
                .send({ success: false, message: "No posts found" });

        res.status(200).send({ success: true, posts });
    }
    catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

/* 
* this functions returns all the posts 
* GET request at /posts/:postId
*/
exports.getPost = async (req, res) => {
    const { postId } = req.params;
    try {
        const post = await Post.findById({ _id: postId }, {}, { lean: true }).populate(
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
        const post = await Post.create({
            user: req.userId,
            content,
        });


        res.status(201).send({ success: true, post });
    }
    catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

/* 
* this functions edits an existing post
* PUT request at /posts/:postId
*/
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
        const post = await Post
            .findByIdAndUpdate({ _id: postId }, postObj, { new: true })
            .populate("user", "name photo location");
        res.status(201).send({ success: true, post });
    }
    catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

/* 
* this functions deletes a post
* DELETE request at /posts/:postId
*/
exports.deletePost = async (req, res) => {
    const { postId } = req.params;
    try {
        const post = await Post.findByIdAndDelete({ _id: postId });
        if (!post)
            return res
                .status(404)
                .send({ success: false, message: "No posts found for this post id" });

        res.status(200).send({ success: true, post });
    }
    catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

/* 
* this functions gets post by user
*GET request at /posts/:userId
*/
exports.getPostsByUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const posts = await Post.find(
            { user: userId },
            {},
            { lean: true }
        ).populate({
            path: "user",
            select: "name photo",
        });
        if (!posts || posts.length === 0)
            return res
                .status(404)
                .send({ success: false, message: "No posts found for this user" });

        res.status(200).send({ success: true, posts });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
};
