import axios from "axios";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import { useState } from "react";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const login = async (email, password) => {
    setLoading(true);
    try {
      const success = handleInputErrors(email, password);
      if (!success) return;
      const response = await axios.post(
        `https://chatsup-uz9w.onrender.com/api/user/signin`,
        email,
        password
      );
      const { data } = response;
      localStorage.setItem("token", data.token);
      localStorage.setItem("authUser", JSON.stringify(data.user));
      setAuthUser(data.user);
      toast.success("Login Successfull");
      return data;
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, login };
};

export default useLogin;

const handleInputErrors = ({ email, password }) => {
  if (!email || !password) {
    toast.error("All fields are required");
    return false;
  }

  return true;
};
