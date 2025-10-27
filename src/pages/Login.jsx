// src/pages/Login.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      "Login functionality will be implemented with Firebase authentication."
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="form-control">
              <input
                name="email"
                type="email"
                required
                className="input input-bordered w-full"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-control">
              <input
                name="password"
                type="password"
                required
                className="input input-bordered w-full"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link
                to="/forgot-password"
                className="text-primary hover:underline"
              >
                Forgot your password?
              </Link>
            </div>
          </div>

          <div>
            <button type="submit" className="btn btn-primary w-full text-white">
              Sign in
            </button>
          </div>

          <div className="divider">OR</div>

          <div>
            <button
              type="button"
              className="btn btn-outline w-full"
              onClick={() =>
                alert("Google login will be implemented with Firebase")
              }
            >
              Sign in with Google
            </button>
          </div>

          <div className="text-center">
            <Link to="/register" className="text-primary hover:underline">
              Don't have an account? Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
