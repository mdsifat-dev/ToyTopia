// src/pages/NotFound.jsx
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="text-center">
        <h1 className="text-8xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-4xl font-semibold text-gray-800 mb-4">
          Page Not Found
        </h2>
        <p className=" text-2xl text-gray-600 mb-8">
          The page you are looking for is under construction 🏗️
        </p>
        <Link to="/" className="btn btn-primary text-white">
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
