
const express = require('express');
const { login, signUp } = require("../controllers/auth.controllers")
const router = express.Router();

router.route('/auth/login').post(login);
router.route("auth/signup").post(signUp)
module.exports = router;