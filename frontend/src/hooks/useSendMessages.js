import React, { useState } from "react";
import axios from "axios";
import useConversation from "../store/useConversation";
import toast from "react-hot-toast";

const useSendMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  const sendMessages = async (message) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:8000/api/messages/send/${selectedConversation._id}`,
        { message },
        { headers: { authorization: localStorage.getItem("token") } }
      );
      const { data } = response;
      setMessages([...messages, data]);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, sendMessages };
};

export default useSendMessages;
