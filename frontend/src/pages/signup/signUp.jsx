import React, { useState } from "react";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log({ name, email, password, profilePicture });
  };

  return (
    <div className="p-6 bg-white bg-opacity-20 backdrop-blur-lg shadow-lg rounded-lg max-w-sm w-full border border-white/30">
      <div className="flex flex-col items-center mb-6">
        <div className="w-32 h-32 rounded-full overflow-hidden flex items-center justify-center bg-gray-800 text-white">
          {profilePicture ? (
            <img
              src={profilePicture}
              alt="Profile"
              className="object-cover w-full h-full"
            />
          ) : (
            <span className="text-sm text-center">No Image</span>
          )}
        </div>
      </div>
      <h2 className="text-xl font-bold text-center mb-4 text-white">Signup</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text text-white">Name</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="input input-bordered w-full bg-white bg-opacity-25 text-white placeholder-white"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text text-white">Email</span>
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="input input-bordered w-full bg-white bg-opacity-25 text-white placeholder-white"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text text-white">Password</span>
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="input input-bordered w-full bg-white bg-opacity-25 text-white placeholder-white"
            required
          />
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="file-input file-input-md w-full file-input-bordered bg-white bg-opacity-25 text-white mt-4 max-w-xs"
        />
        <div className="form-control mt-4">
          <button type="submit" className="btn btn-primary w-full">
            Signup
          </button>
        </div>
      </form>
      <p className="text-center text-white mt-4">
        Have an account?{" "}
        <a href="/signin" className="text-blue-400 hover:underline">
          Sign in
        </a>
      </p>
    </div>
  );
};

export default SignUp;
