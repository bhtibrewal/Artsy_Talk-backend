const express = require('express');
const { getUsers, getUser, updateUserDetails } = require('../controllers/users.controller');
const router = express.Router();

router.route('/users').get(getUsers)
// .post((req, res) => {
//     console.log("post here");
// })

router.route("/users/:userId").get(getUser).post(updateUserDetails)
module.exports = router;