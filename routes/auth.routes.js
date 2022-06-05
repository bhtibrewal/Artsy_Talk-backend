const express = require('express');
const { login, signUp, logout } = require("../controllers/auth.controllers")
const router = express.Router();

router.route('/auth/login').post(login);
router.route("/auth/signup").post(signUp);
router.route("/auth/logout").get(logout);

module.exports = router;