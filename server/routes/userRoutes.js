import express from 'express';
import { addFriend, searchUsers } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.get('/search', searchUsers);
userRouter.post('/addFriend', addFriend);

export default userRouter;