const cookieToken = require("../utils/cookieToken");
const User = require("../models/user.model")

exports.signUp = async (req, res) => {
    let user;
    const { email, password, name, username } = req.body;

    if (!email || !password || !name || !username)
        res.status(400).json({ error: "Please fill the details" });

    try {
        user = await User.create({ email, password, name, username });

        const { token, options } = cookieToken(user);

        res
            .status(201)
            .cookie("token", token, options)
            .json({ user, token, success: true });
    }
    catch (error) {
        return res.status(500).send({ success: false, message: error.message });
    }
}

exports.login = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res
            .status(400)
            .json({ success: false, error: "Username and password are requied" });
    }

    try {
        //get user from db
        const user = await User.findOne({ username }).select("+password");

        // if user not exist
        if (!user)
            return res.status(404).send({
                success: false,
                message: "You are not registerd, create a new account",
            });

        const isPasswordValid = await user.checkPasswordValid(password);

        if (!isPasswordValid)
            return res
                .status(401)
                .send({ success: false, message: "Email or password does not match" });

        //generate token
        const { token, options } = cookieToken(user);
        user.password = undefined;

        res
            .status(200)
            .cookie("token", token, options)
            .json({ success: true, user, token });
    }
    catch (error) {
        return res.status(500).send({ success: false, message: error.message });
    }
}

exports.logout = async (req, res) => {
    try {
        res.cookie("token", null, {
            expires: new Date(Date.now()),
        })
        res.status(200).send({ success: true, message: "Logout success" });
    }
    catch (error) {
        return res.status(500).send({ success: false, message: error.message });
    }
}
