import express from 'express';
import { addFriend, searchUsers, getFriends } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.get('/search', searchUsers);
userRouter.post('/addFriend', addFriend);
userRouter.get('/getFriends', getFriends);

export default userRouter;