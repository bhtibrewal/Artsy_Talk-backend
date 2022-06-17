const express = require('express');
const { getUsers, getUser, updateUserDetails } = require('../controllers/users.controller');
const router = express.Router();

router.route('/users').get(getUsers)

router.route("/users/:username").get(getUser).post(updateUserDetails)
module.exports = router;