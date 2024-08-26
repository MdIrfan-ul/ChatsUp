import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import useConversation from "../store/useConversation"

const useGetMessages = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();

    useEffect(() => {
        const getMessages = async () => {
            if (!selectedConversation?._id) return;

            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:8000/api/messages/${selectedConversation._id}`, {
                    headers: { Authorization: localStorage.getItem('token') },
                });
                const { data } = response;
                setMessages(data);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        getMessages();
    }, [selectedConversation?._id, setMessages]);

    return { messages, loading };
};

export default useGetMessages;
