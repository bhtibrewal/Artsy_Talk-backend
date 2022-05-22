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
* this functions creates a new post
* POST request at /posts
*/
exports.createPosts = async (req, res) => {
    const { title, content, } = req.body;

}

/* 
* this functions returns all the posts 
* GET request at /posts
*/
exports.getPost = async (req, res) => {
    try {

    }
    catch (error) {

    }
}


exports.editPost = async (req, res) => {
    try {

    }
    catch (error) {

    }
}

exports.deletePost = async (req, res) => {
    try {

    }
    catch (error) {

    }
}
