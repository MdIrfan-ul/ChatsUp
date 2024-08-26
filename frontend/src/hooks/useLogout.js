import axios from "axios";
import { useState } from "react"
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useLogout = ()=>{
    const [loading,setLoading] = useState(false);
    const {setAuthUser} = useAuthContext();
    const logout = async ()=>{
        try {
            
            const response = await axios.get('http://localhost:8000/api/user/logout');
            const {data} = response;
            localStorage.removeItem('user');
            setAuthUser(null);
            toast.success(data.message);
            return ;
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    return {logout};
}

export default useLogout;