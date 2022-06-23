exports.bookmarkPost = async (req, res) => {
    try {
        const { postId } = req.params;
        if (!postId)
            return res.status(400).send({ success: false, error: "Provide a post ID" });

        const user = await User.findOneAndUpdate(
            {
                _id: req.userId,
                bookmarks: {
                    $nin: [mongoose.Types.ObjectId(postId)],
                },
            },
            {
                $push: {
                    bookmarks: {
                        $nin: postId,
                    },
                },
            },
            { new: true }
        );
        res.status(200).json({ success: true, user })
    }
    catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

exports.unbookmarkPost = async (req, res) => {
    try {
        const { postId } = req.params;
        if (!postId)
            return res.status(400).send({ success: false, error: "Provide a post ID" });

        const user = await User.findOneAndUpdate(
            {
                _id: req.userId,
                bookmarks: {
                    $in: [mongoose.Types.ObjectId(postId)],
                },
            },
            {
                $pull: {
                    bookmarks: {
                        $in: [mongoose.Types.ObjectId(postId)],
                    },
                },
            },
            { new: true }
        );
        res.status(200).json({ success: true, user })
    }
    catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}
