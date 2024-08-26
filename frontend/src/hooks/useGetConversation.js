import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import { useAuthContext } from '../context/AuthContext';

const useGetConversation = () => {
  const [loading,setLoading] = useState(false);
  const [conversations,setConversations] = useState([]);
  const navigate = useNavigate();
  const {setAuthUser} = useAuthContext();

  useEffect(()=>{
    const getConversations = async ()=>{
        setLoading(true);
        try {
            const response = await axios.get('https://chatsup-uz9w.onrender.com/api/user/',{headers:{Authorization:localStorage.getItem('token')}});
            const {data} = response;
            setConversations(data.allUsers);
        } catch (error) {
          if (error.response.status === 401) { // Check for unauthorized status
            setAuthUser(null);
            navigate('/login'); // Redirect to login page
          } else {
            toast.error(error.response.data.message);
          }
        }finally{
            setLoading(false);
        }

    }
    getConversations();
  },[navigate]);
  return {loading,conversations};
}

export default useGetConversation;