const crypto = require("crypto");
const User = require("../models/user.model");


exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ users }).limit(20)
    }
    catch (error) {

    }
}

exports.getUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId);
        if (!user)
            return res.status(400).send({ success: false, message: "couldn't find user" });
        res.status(200).json({ user })
    }
    catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

exports.updateUserDetails =async(req, res)=>{

}