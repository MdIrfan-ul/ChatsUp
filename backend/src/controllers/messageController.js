import { getReceiverSocketId, io } from "../../socket/socket.js";
import ConversationModel from "../models/conversation.js";
import MessageModel from "../models/message.js"

export const sendMessage = async(req,res)=>{
try {
    const {id:receiverId} = req.params;
    const {message} = req.body;
    const senderId = req.userId;
    let conversation= await ConversationModel.findOne({
        participants:{$all:[senderId,receiverId]},
    });
    if(!conversation){
        conversation = await ConversationModel.create({participants:[senderId,receiverId]})
    }
    const newMessage = new MessageModel({
        senderId,
        receiverId,
        message,
    });
    if(newMessage){
        conversation.messages.push(newMessage._id);
    }
   await Promise.all([newMessage.save(),conversation.save()]);
   const receiverSocketId = getReceiverSocketId(receiverId);
   if(receiverSocketId){
io.to(receiverSocketId).emit("newMessage",newMessage);
   }
    res.status(201).json(newMessage);
} catch (error) {
    res.status(500).json({error:"Internal Server error"});
}
};

export const getMessages = async(req,res)=>{
    try {
        const {id:userChatId} = req.params;
        const senderId = req.userId;
        const conversation = await ConversationModel.findOne({
            participants:{$all:[senderId,userChatId]},
        }).populate("messages");

        if(!conversation) return res.status(200).json([]);
        const messages = conversation.messages;
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({error:"Internal Server error"});
    }
}