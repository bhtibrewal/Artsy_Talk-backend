const express = require('express');
const { postComment, deleteComment } = require("../controllers/comment.controller");
const authenticateToken = require('../middleware/authenticateToken');
const router = express.Router();

router.route('/comments').post(authenticateToken, postComment);
router.route("/comments/:commentId").delete(authenticateToken, deleteComment);

module.exports = router;