import express from "express";
import { getMessages, sendMessage } from "../controllers/messageController.js";

const MessageRoutes = express.Router();

MessageRoutes.get('/:id',getMessages);
MessageRoutes.post('/send/:id',sendMessage);

export default MessageRoutes;