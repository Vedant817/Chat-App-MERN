import User from "../models/User.js";

const searchUsers = async (req, res) => {
    const { username } = req.query;
    if (!username) {
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
    const { loggedInUsername, friendUsername } = req.body;

    if (!loggedInUsername || !friendUsername) {
        return res.status(400).json({ message: "Please provide both usernames." });
    }

    try {
        const [currentUser, friendUser] = await Promise.all([
            User.findOne({
                fullName: {
                    $regex: loggedInUsername, $options: "i"
                }
            }),
            User.findOne({
                fullName: {
                    $regex: friendUsername, $options: "i"
                }
            })
        ]);

        if (!currentUser || !friendUser) {
            return res.status(404).json({ message: "User not found." });
        }

        if (currentUser.friends.includes(friendUser._id.toString())) {
            return res.status(400).json({ message: "This user is already your friend." });
        }

        // Add each user's ID to the other's friends array
        currentUser.friends.push(friendUser._id);
        friendUser.friends.push(currentUser._id);

        // Save both users
        await Promise.all([
            currentUser.save(),
            friendUser.save()
        ]);

        res.status(200).json({ message: "Friend added successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error adding friend." });
    }
};

const getFriends = async (req, res) => {
    const { username } = req.query;

    if (!username) {
        return res.status(400).json({ message: "Please provide a username." });
    }

    try {
        const user = await User.findOne({
            fullName: { $regex: username, $options: "i" }
        });

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        const friends = await User.find({ _id: { $in: user.friends } }).select('fullName');

        res.status(200).json(friends);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error getting friends." });
    }
}

export { searchUsers, addFriend, getFriends };