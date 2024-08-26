
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const useSignup = ()=>{
  const[loading,setLoading] = useState(false);    
    const signup = async ({ name, email, password, profilePicture }) => {
      setLoading(true);
        try {
          const success = handleInputErrors({name,email,password,profilePicture});
          if(!success) return;
          const formData = new FormData();
          formData.append("name", name);
          formData.append("email", email);
          formData.append("password", password);
          formData.append("profilePicture", profilePicture);
    
          const response = await axios.post(
            "https://chatsup-uz9w.onrender.com/api/user/signup",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
    
          const { data } = response;
          toast.success(data.message);
          return data.success;
        } catch (error) {
          if (error.response && error.response.data) {
            toast.error(error.response.data.message || "An error occurred");
        } else {
            toast.error("An error occurred");
        }
    }finally{
      setLoading(false);
    }
      };
    return {signup,loading};
}

export default useSignup;

const handleInputErrors =({name,email,password,profilePicture})=>{
  if (!name || !email || !password) {
    toast.error("All fields are required");
    return false;
}


if (!profilePicture) {
    toast.error("Profile picture is required");
    return false;
}

return true;
}