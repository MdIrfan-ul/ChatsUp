import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log({ email, password });
  };

  return (
    <div className="p-6 bg-white bg-opacity-20 backdrop-blur-lg shadow-lg rounded-lg max-w-sm w-full border border-white/30">
      <h2 className="text-xl font-bold text-center mb-4 text-white">Sign In</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
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
        <div className="form-control mt-4">
          <button type="submit" className="btn btn-primary w-full">
            Sign In
          </button>
        </div>
      </form>
      <p className="text-center text-white mt-4">
        Don't have an account?{" "}
        <a href="/signup" className="text-blue-400 hover:underline">
          Sign up
        </a>
      </p>
    </div>
  );
};

export default Login;
