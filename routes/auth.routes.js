
const express = require('express');
const { login, signUp } = require("../controllers/auth.controllers")
const router = express.Router();

router.route('/auth/login').post(login);
router.post('/auth/signup', signUp);

module.exports = router;