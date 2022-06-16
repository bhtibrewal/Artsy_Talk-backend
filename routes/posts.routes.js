const express = require('express');
const { createPosts, getPosts, getPost, editPost, deletePost } = require('../controllers/posts.controller');
const authenticateToken = require('../middleware/authenticateToken');

const router = express.Router();

router.route('/posts')
    .get( getPosts)
    .post(authenticateToken, createPosts);

router.route('/posts/:postId')
    .get(authenticateToken, getPost)
    .put(authenticateToken, editPost)
    .delete(authenticateToken, deletePost)

module.exports = router;