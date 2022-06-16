const express = require('express');
const { postComment, deleteComment } = require("../controllers/comment.controller");
const authenticateToken = require('../middleware/authenticateToken');
const router = express.Router();

router.route('/comments')
.post(authenticateToken, postComment)
.delete(authenticateToken, deleteComment);

module.exports = router;