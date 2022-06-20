const crypto = require("crypto");
const { default: mongoose } = require("mongoose");
const User = require("../models/user.model");

/* this API will get the details of all users
 * send a GET request at /users
 */
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users }).limit(20)
  }
  catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
}

/* this API will get the user details
 * send a GET request at /users/:username
 */

exports.getUser = async (req, res) => {
  try {
    const { username } = req.params;
    const [user] = await User.find({ username });
    if (!user)
      return res.status(400).send({ success: false, message: "couldn't find user" });
    res.status(200).json({ user: user })
  }
  catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
}

/* this API will update the user details
 * send a PUT request at /users/:username
 */
exports.updateUserDetails = async (req, res) => {
  const { username } = req.params;
  try {
    const userData = req.body;
    const { name, email, website, bio, profile_pic } = userData;

    const [user] = await User.find({ username });
    if (!user)
      return res.status(400).send({ success: false, message: "couldn't find user" });
    let newUrl = !website.startsWith("http") ? "https://" + website
      : website;

    // update user datails in DB
    const newUser = await User.findByIdAndUpdate(
      user.id,
      {
        name: name || user.name,
        email: email || user.email,
        bio,
        website: newUrl,
        profile_pic: profile_pic || user.profile_pic
      },
      { new: true }
    );

    res.status(200).json({ user: newUser })
  }
  catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
}

exports.followUser = async (req, res) => {
  const { followeeId } = req.body;
  try {
    const user = await User.findOneAndUpdate(
      {
        _id: req.userId,
        followings: {
          $nin: [mongoose.Types.ObjectId(followeeId)],
        },
      },
      {
        $push: {
          followings: followeeId,
        },
      },
      { new: true }
    );

    const followee = await User.findOneAndUpdate(
      {
        _id: followeeId,
        followers: {
          $nin: [mongoose.Types.ObjectId(req.userId)],
        },
      },
      {
        $push: {
          followers: req.userId,
        },
      },
      { new: true }
    );

    if (!user || !followee)
      return res.status(400).send({
        success: false,
        message: "User not found or already followed",
      });

    res.status(200).send({ success: true, user, followUser: followee });
  }
  catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
}

exports.unfollowUser = async (req, res) => {
  const { followeeId } = req.body;
  try {
    const user = await User.findOneAndUpdate(
      {
        _id: req.userId,
        followings: {
          $in: [mongoose.Types.ObjectId(followeeId)],
        },
      },
      {
        $pull: {
          followings: {
            $in: [mongoose.Types.ObjectId(followeeId)],
          },
        },
      },
      { new: true }
    );

    const followee = await User.findOneAndUpdate(
      {
        _id: followeeId,
        followers: {
          $in: [mongoose.Types.ObjectId(req.userId)],
        },
      },
      {
        $pull: {
          followers: {
            $in: [mongoose.Types.ObjectId(req.userId)],
          },
        },
      },
      { new: true }
    );
    if (!user || !followee)
      return res.status(400).send({
        success: false,
        message: "User not found or not followed",
      });
    res.status(200).send({ success: true, user, followUser: followee });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }

}

/* this API will 
 * send a GET request at /user/followers
 */

exports.getFollowers = async (req, res) => {
  try {
    const followers = await User.find({
      followings: {
        $in: [mongoose.Types.ObjectId(req.userId)],
      },
    });
    res.send({ success: true, followers });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: error.message });
  }
}

exports.getFollowings = async (req, res) => {
  try {
    const followings = await User.find({
      followers: {
        $in: [mongoose.Types.ObjectId(req.userId)],
      },
    });
    res.send({ success: true, followings });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: error.message });
  }
};

/* this API will search for users
 * send a GET request at /search_users
 */
exports.searchUsers = async (req, res) => {
  const { name } = req.query;
  try {
    const users = await User.find({
      name: {
        $regex: new RegExp(".*" + name + ".*", "i"),
      },
    });
    res.send({ success: true, users });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};