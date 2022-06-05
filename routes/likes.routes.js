const express = require('express');
const { dislikePost, likePost } = require('../controllers/likes.controller');

const router = express.Router();

router.route('/posts/likes').post(likePost).delete(dislikePost)
  
module.exports = router;