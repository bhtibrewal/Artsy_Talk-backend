const express = require('express');
const { bookmarkPost, unbookmarkPost } = require('../controllers/bookmarks.controllers');
const authenticateToken = require('../middleware/authenticateToken');

const router = express.Router();

router.route('/bookmark/:postId')
    .post(authenticateToken, bookmarkPost)
    .delete(authenticateToken, unbookmarkPost);

module.exports = router;
