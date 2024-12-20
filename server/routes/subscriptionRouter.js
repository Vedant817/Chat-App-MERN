import express from 'express';
import { subscribe } from '../controllers/subscriptionController.js';

const subscriptionRouter = express.Router();
subscriptionRouter.post('/', subscribe);

export default subscriptionRouter;