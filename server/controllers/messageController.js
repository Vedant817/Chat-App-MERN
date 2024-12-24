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
        })
        .populate('sender', 'fullName')
        .populate('receiver', 'fullName')
        .sort({ timestamp: 1 });

        const formattedMessages = messages.map(msg => ({
            sender: msg.sender.fullName,
            receiver: msg.receiver.fullName,
            message: msg.message,
            timestamp: msg.timestamp
        }));

        res.status(200).json(formattedMessages);
    } catch (error) {
        console.error('Error in getChatMessages:', error);
        res.status(500).json({ message: 'Error fetching chat messages', error: error.message });
    }
};

const sendChatMessages = async (req, res) => {
    const { sender, receiver, message } = req.body;
    
    try {
        const senderId = await User.findOne({ fullName: sender });
        const receiverId = await User.findOne({ fullName: receiver });
        
        if (!senderId || !receiverId) {
            return res.status(404).json({ 
                message: "Sender or Receiver not found",
                debug: { sender, receiver } 
            });
        }

        const newMessage = new Message({
            sender: senderId._id,
            receiver: receiverId._id,
            message: message,
            timestamp: new Date()
        });

        const savedMessage = await newMessage.save();

        // Populate the sender and receiver information
        const populatedMessage = await Message.findById(savedMessage._id)
            .populate('sender', 'fullName')
            .populate('receiver', 'fullName');

        // Format the message for socket emission
        const formattedMessage = {
            sender: populatedMessage.sender.fullName,
            receiver: populatedMessage.receiver.fullName,
            message: populatedMessage.message,
            timestamp: populatedMessage.timestamp
        };

        // Emit the message to both sender and receiver in real-time
        if (req.io) {
            req.io.emit('chat message', formattedMessage);
        }

        res.status(201).json(formattedMessage);
    } catch (error) {
        console.error('Error in sendChatMessages:', error);
        res.status(500).json({ 
            message: 'Error sending chat messages', 
            error: error.message 
        });
    }
};

export { getChatMessages, sendChatMessages };
