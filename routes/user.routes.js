const express = require('express');
const { getUsers, getUser, updateUserDetails, followUser, unfollowUser, searchUsers, getFollowers, getFollowings } = require('../controllers/users.controller');
const authenticateToken = require('../middleware/authenticateToken');
const router = express.Router();

router.route('/users').get(getUsers)

router.route("/users/:username")
    .get(getUser)
    .put(authenticateToken, updateUserDetails)

router.route("/user/follow").post(authenticateToken, followUser);
router.route("/user/unfollow").post(authenticateToken, unfollowUser);
router.route("/user/followers").get(authenticateToken, getFollowers)
router.route("/user/following").get(authenticateToken, getFollowings)
router.route("/search_users").get(searchUsers)


module.exports = router;

