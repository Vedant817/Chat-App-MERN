import Message from "../models/Messages.js";
import User from "../models/User.js";

const getChatMessages = async (req, res) => {
    const { sender, receiver } = req.params;

    try {
        const senderId = await User.findOne({ fullName: sender });
        const receiverId = await User.findOne({ fullName: receiver });

        if (!senderId || !receiverId) {
            return res.status(404).json({ message: "Sender or Receiver not found" });
        }

        const messages = await Message.find({
            $or: [
                { sender: senderId._id, receiver: receiverId._id },
                { sender: receiverId._id, receiver: senderId._id }
            ]
        }).sort({ timestamp: 1 });

        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching chat messages', error });
    }
};

const sendChatMessages = async (req, res) => {
    const { sender, receiver, message } = req.body;

    try {
        const senderId = await User.findOne({ fullName: sender });
        const receiverId = await User.findOne({ fullName: receiver });

        if (!senderId || !receiverId) {
            return res.status(404).json({ message: "Sender or Receiver not found" });
        }

        const newMessage = new Message({
            sender: senderId._id,
            receiver: receiverId._id,
            message: message,
            timestamp: new Date()
        });

        await newMessage.save();

        // Emit the message to both sender and receiver in real-time
        io.emit('chat message', {
            sender: sender,
            receiver: receiver,
            message: message,
            timestamp: newMessage.timestamp
        });

        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ message: 'Error sending chat messages', error });
    }
};

export { getChatMessages, sendChatMessages };
