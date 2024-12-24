import express from 'express';
import bodyParser from "body-parser";
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import dotenv from 'dotenv';
import authRouter from './routes/authRoutes.js';
import subscriptionRouter from './routes/subscriptionRouter.js';
import userRouter from './routes/userRoutes.js';
import MessageRouter from './routes/messageRoutes.js';
import http from 'http';
import { Server } from 'socket.io';
import { sendChatMessages } from './controllers/messageController.js';
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    transports: ['websocket', 'polling'],
    cors: {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        credentials: true
    },
    pingTimeout: 60000,
    pingInterval: 25000
});
app.use(express.json());
app.use(helmet());
app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
        connectSrc: ["'self'", "ws://localhost:5000"],
    },
}));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: "*",
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
}));
app.use((req, res, next) => {
    req.io = io;
    next();
});

app.use('/api/auth', authRouter);
app.use('/api/subscription', subscriptionRouter);
app.use('/api/user', userRouter);
app.use('/api/message', MessageRouter);

const PORT = process.env.PORT || 5000;
const MONGODB_URL = process.env.MONGODB_URL;

mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');

    io.on('connection', (socket) => {
        socket.on('chat message', async (message) => {
            try {
                // Store the message in the database
                const { sender, receiver, message: messageText } = message;
                const messageData = {
                    sender,
                    receiver,
                    message: messageText,
                };

                // Use the controller to save the message
                const response = await sendChatMessages({ 
                    body: messageData,
                    io: io
                });

                if (response.status === 201) {
                    // Message saved successfully, broadcast to clients
                    io.emit('chat message', message);
                }
            } catch (error) {
                console.error('Error saving message:', error);
                socket.emit('error', { message: 'Failed to save message' });
            }
        });

        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
        });
    });

    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })
}).catch((error) => {
    console.log('MongoDB connection failed', error);
    process.exit(1);
});