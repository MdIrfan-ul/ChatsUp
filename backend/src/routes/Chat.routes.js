// src/routes/Chat.routes.js
import express from 'express';
import { createChat, sendMessage, getMessages, getUserChats } from '../controllers/ChatControllers.js';

const ChatRoutes = express.Router();

// Route to create a new chat
ChatRoutes.post('/create', createChat);

// Route to send a message
ChatRoutes.post('/:chatId/message', sendMessage);

// Route to get all messages in a chat
ChatRoutes.get('/:chatId/messages', getMessages);

// Optional: Route to get all chats for a specific user
ChatRoutes.get('/user', getUserChats);

export default ChatRoutes;
