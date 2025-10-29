// src/components/Navbar.jsx - DaisyUI Native Dropdown Version
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="navbar bg-base-100 shadow-lg sticky top-0 z-50">
      {/* Website Name */}
      <div className="navbar-start">
        <Link to="/" className="btn btn-ghost text-xl font-bold text-primary">
          🎮 ToyTopia
        </Link>
      </div>

      {/* Navigation Links - Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-2">
          <li>
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                isActive("/")
                  ? "bg-primary text-primary-content font-bold shadow-md"
                  : "hover:bg-base-200 hover:text-primary"
              }`}
            >
              Home
            </Link>
          </li>
          {currentUser && (
            <li>
              <Link
                to="/my-profile"
                className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                  isActive("/my-profile")
                    ? "bg-primary text-primary-content font-bold shadow-md"
                    : "hover:bg-base-200 hover:text-primary"
                }`}
              >
                My Profile
              </Link>
            </li>
          )}
        </ul>
      </div>

      {/* User Section - Right Side */}
      <div className="navbar-end">
        {currentUser ? (
          <div className="flex items-center space-x-4">
            {/* DaisyUI Native Dropdown */}
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar group"
              >
                <div className="w-10 rounded-full ring-2 ring-primary ring-offset-2 ring-offset-base-100">
                  <img
                    alt="User profile"
                    src={
                      currentUser.photoURL ||
                      "https://via.placeholder.com/40x40?text=U"
                    }
                  />
                </div>

                <div className="absolute top-full right-0 mt-1 bg-gray-800 text-white text-sm rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 px-2 pt-1 pb-0 leading-tight whitespace-normal text-right max-w-[150px] wrap-break-word">
                  {currentUser?.displayName || "User"}
                </div>
              </div>

              <ul
                tabIndex={0}
                className="mt-3 z-1 p-2 shadow-lg menu menu-sm dropdown-content bg-base-100 rounded-box w-64 border border-base-300"
              >
                {/* User Header */}
                <li className="px-4 py-3 border-b border-base-300 bg-base-200 rounded-t-box">
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="w-10 rounded-full">
                        <img
                          src={
                            currentUser.photoURL ||
                            "https://via.placeholder.com/40x40?text=U"
                          }
                          alt="Profile"
                        />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate">
                        {currentUser.displayName || "User"}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {currentUser.email}
                      </p>
                    </div>
                  </div>
                </li>

                <li>
                  <Link to="/" className="justify-between">
                    Home <span>🏠</span>
                  </Link>
                </li>
                <li>
                  <Link to="/my-profile" className="justify-between">
                    My Profile <span>👤</span>
                  </Link>
                </li>

                <div className="divider my-1"></div>

                <li>
                  <button
                    onClick={handleLogout}
                    className="justify-between text-red-600 hover:bg-red-50"
                  >
                    Logout
                    <span className="text-red-500">🚪</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <Link to="/login" className="btn btn-primary text-white">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
