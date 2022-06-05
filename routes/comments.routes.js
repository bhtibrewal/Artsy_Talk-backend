const express = require('express');
const { postComment, deleteComment } = require("../controllers/comment.controller")
const router = express.Router();

router.route('/comments').post(postComment);
router.route("/comments/:commentId").delete(deleteComment);

module.exports = router;