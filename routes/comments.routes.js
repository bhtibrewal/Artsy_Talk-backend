const express = require('express');
const { postComment, deleteComment, getAllComments } = require("../controllers/comment.controller");
const authenticateToken = require('../middleware/authenticateToken');
const router = express.Router();

router.route('/comments')
    .get(authenticateToken, getAllComments)
    .post(authenticateToken, postComment)
    .delete(authenticateToken, deleteComment);

module.exports = router;