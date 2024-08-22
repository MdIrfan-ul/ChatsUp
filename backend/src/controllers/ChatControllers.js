import mongoose from 'mongoose';
import ChatModel from '../models/Chat.js';

// Controller to create a new chat
export const createChat = async (req, res) => {
  try {
    const userId = req.userId;
    const { users } = req.body;
    console.log(userId);

    // Ensure the authenticated user is part of the chat
    if (!users.includes(userId)) {
      users.push(userId);
    }

    const chat = new ChatModel({ users });
    await chat.save();

    res.status(201).json(chat);
  } catch (error) {
    res.status(500).json({ error: 'Server error. Failed to create chat.' });
  }
};

// Controller to send a message in a chat
export const sendMessage = async (req, res) => {
  try {
    const { chatId } = req.params;
    const { message } = req.body;

    const chat = await ChatModel.findById(chatId).populate('users','name');
    if (!chat) {
      return res.status(404).json({ error: 'Chat not found' });
    }

   // Ensure the authenticated user is part of the chat
   const isUserInChat = chat.users.some(user => user._id.toString() === req.userId);
   if (!isUserInChat) {
     return res.status(403).json({ error: 'You are not authorized to send messages in this chat.' });
   }

   const senderUser = chat.users.find(user => user._id.toString() === req.userId);
    const newMessage = { sender: senderUser.name, message };
    chat.messages.push(newMessage);
    await chat.save();

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: 'Server error. Failed to send message.' });
  }
};

// Controller to get all messages in a chat
export const getMessages = async (req, res) => {
  try {
    const { chatId } = req.params;

    const chat = await ChatModel.findById(chatId).populate('messages.sender', 'name');
    if (!chat) {
      return res.status(404).json({ error: 'Chat not found' });
    }

    // Ensure the authenticated user is part of the chat
    if (!chat.users.includes(req.userId)) {
      return res.status(403).json({ error: 'You are not authorized to view messages in this chat.' });
    }

    res.status(200).json(chat.messages);
  } catch (error) {
    res.status(500).json({ error: 'Server error. Failed to retrieve messages.' });
  }
};

export const getUserChats = async (req, res) => {
    try {
      const userId = req.userId; 
      const chats = await ChatModel.find({ users: userId}).populate('users', 'name');
      res.status(200).json({success:true,message:"user chats fetched successfully",chats});
    } catch (error) {
        console.log(error);
      res.status(500).json({ error: 'Server error. Failed to retrieve user chats.' });
    }
  };
  