import User from "../models/User.js";

const searchUsers = async (req, res) => {
    const { username } = req.query;
    if(!username) {
        return res.status(400).json({ message: "Please provide a username." });
    }

    try {
        const users = await User.findOne({
            fullName: { $regex: username, $options: "i" },
        })
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Error searching for users." });
    }
};

const addFriend = async (req, res) => {
    const { username } = req.body;
    const currentUserId = req.user.id; // Assuming you have middleware to set req.user

    try {
        const friend = await User.findOne({ fullName: username });

        if (!friend) {
            return res.status(404).json({ message: "User not found." });
        }

        const currentUser = await User.findById(currentUserId);

        if (currentUser.friends.includes(friend._id)) {
            return res.status(400).json({ message: "This user is already your friend." });
        }

        currentUser.friends.push(friend._id);
        await currentUser.save();

        res.status(200).json({ message: "Friend added successfully." });
    } catch (error) {
        res.status(500).json({ message: "Error adding friend." });
    }
};

export { searchUsers, addFriend };