const express = require('express');
const { dislikePost, likePost } = require('../controllers/likes.controller');
const authenticateToken = require('../middleware/authenticateToken');

const router = express.Router();

router.route('/posts/likes/:postId')
    .post(authenticateToken, likePost)
    .delete(authenticateToken, dislikePost)

module.exports = router;