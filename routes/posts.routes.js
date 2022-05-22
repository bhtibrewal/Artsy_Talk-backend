const express = require('express');
const { createPosts, getPosts, getPost, editPost, deletePost } = require('../controllers/posts.controller');

const router = express.Router();

router.route('/posts').get(getPosts).post(createPosts);

router.route("/posts/:postId").get(getPost).post(editPost).delete(deletePost)

module.exports = router;