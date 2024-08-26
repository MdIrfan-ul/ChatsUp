import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import useLogin from "../../hooks/useLogin";

const Login = () => {
  const [inputs,setInputs] = useState({email:'',password:''});
  const {loading,login} = useLogin();

  const handleInputChange = (e)=>{
    const {name,value} = e.target;
    setInputs({...inputs,[name]:value});
  }
  const handleSubmit = async(e) => {
    e.preventDefault();
    await login(inputs);
  };

  return (
    <div className="p-6 bg-white bg-opacity-20 backdrop-blur-lg shadow-lg rounded-lg max-w-sm w-full border border-white/30">
     <h1 className="text-3xl font-semibold text-center text-gray-300">
        Login <span className="text-blue-500">ChatsUp</span>
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text text-white">Email</span>
          </label>
          <input
            type="email"
            value={inputs.email}
            name="email"
            onChange={handleInputChange}
            placeholder="Enter your email"
            className="input input-bordered w-full bg-white bg-opacity-25 text-white placeholder-white"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text text-white">Password</span>
          </label>
          <input
            type="password"
            value={inputs.password}
            name="password"
            onChange={handleInputChange}
            placeholder="Enter your password"
            className="input input-bordered w-full bg-white bg-opacity-25 text-white placeholder-white"
          />
        </div>
        <div className="form-control mt-4">
          <button type="submit" className="btn btn-primary w-full" disabled={loading}>
           {loading?<span className="loading loading-spinner"></span>:"Sign In"}
          </button>
        </div>
      </form>
      <p className="text-center text-white mt-4">
        Don't have an account?{" "}
        <NavLink to="/signup" className="text-blue-400 hover:underline">
          Sign up
        </NavLink>
      </p>
    </div>
  );
};

export default Login;
