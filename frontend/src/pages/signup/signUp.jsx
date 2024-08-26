import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useSignup from "../../hooks/useSignup";

const SignUp = () => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    profilePicture: "",
  });
  const [preview,setPreview] = useState();
  const {signup,loading} = useSignup();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
  
    if (name === "profilePicture" && files && files.length > 0) {
      setInputs({ ...inputs, profilePicture: files[0] });
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setInputs({ ...inputs, [name]: value });
    }
  };
  

  const handleSubmit = async(e) => {
    e.preventDefault();
    const response = await signup(inputs);
    
    if (response) {
      navigate('/login'); // Redirect to login page on successful signup
    }
  };

  return (
    <div className="p-6 bg-white bg-opacity-20 backdrop-blur-lg shadow-lg rounded-lg max-w-sm w-full border border-white/30">
      <div className="flex flex-col items-center mb-6">
        <div className="w-32 h-32 rounded-full overflow-hidden flex items-center justify-center bg-gray-800 text-white">
          {preview ? (
            <img
              src={preview}
              alt="Profile"
              className="object-cover w-full h-full"
            />
          ) : (
            <span className="text-sm text-center">No Image</span>
          )}
        </div>
      </div>
      <h1 className="text-3xl font-semibold text-center text-gray-300">
        Sign Up <span className="text-blue-500">ChatsUp</span>
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text text-white">Name</span>
          </label>
          <input
            type="text"
            value={inputs.name}
            onChange={handleChange}
            name="name"
            placeholder="Enter your name"
            className="input input-bordered w-full bg-white bg-opacity-25 text-white placeholder-white"
            
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text text-white">Email</span>
          </label>
          <input
            type="email"
            value={inputs.email}
            name="email"
            onChange={handleChange}
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
            onChange={handleChange}
            placeholder="Enter your password"
            className="input input-bordered w-full bg-white bg-opacity-25 text-white placeholder-white"
            
          />
        </div>
        <input
          type="file"
          accept="image/*"
          name="profilePicture"
          onChange={handleChange}
          className="file-input file-input-md w-full file-input-bordered bg-white bg-opacity-25 text-white mt-4 max-w-xs"
        />
        <div className="form-control mt-4">
          <button type="submit" className="btn btn-primary w-full" disabled={loading}>
            {loading?<span className="loading loading-spinner"></span>:"Signup"}
          </button>
        </div>
      </form>
      <p className="text-center text-white mt-4">
        Have an account?{" "}
        <NavLink to="/login" className="text-blue-400 hover:underline">
          Sign in
        </NavLink>
      </p>
    </div>
  );
};

export default SignUp;
