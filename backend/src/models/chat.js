
import mongoose from 'mongoose';

const ChatSchema = new mongoose.Schema({
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Participants in the chat
  messages: [{
    sender: { type:String, required:true },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
  }],
});

const ChatModel = mongoose.model('Chat', ChatSchema);

export default ChatModel;
