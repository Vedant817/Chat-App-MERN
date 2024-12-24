import express from 'express';
import { getChatMessages, sendChatMessages } from '../controllers/messageController.js';

const MessageRouter = express.Router();

MessageRouter.get('/:sender/:receiver', getChatMessages);
MessageRouter.post('/', (req, res) => sendChatMessages(req, res, io));

export default MessageRouter;