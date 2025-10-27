// import { Link, useLocation } from "react-router-dom";

// const Navbar = () => {
//   const location = useLocation();

//   const isActive = (path) => location.pathname === path;

//   return (
//     <div className="navbar bg-base-100 shadow-lg sticky top-0 z-50">
//       <div className="navbar-start">
//         <Link to="/" className="btn btn-ghost text-xl">
//           🎮 ToyTopia
//         </Link>
//       </div>

//       <div className="navbar-center hidden lg:flex">
//         <ul className="menu menu-horizontal px-1 gap-2">
//           <li>
//             <Link
//               to="/"
//               className={
//                 isActive("/") ? "active btn btn-primary font-bold" : ""
//               }
//             >
//               Home
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/my-profile"
//               className={
//                 isActive("/my-profile")
//                   ? "active btn btn-primary font-bold"
//                   : ""
//               }
//             >
//               My Profile
//             </Link>
//           </li>
//         </ul>
//       </div>

//       <div className="navbar-end">
//         <Link to="/login" className="btn btn-primary">
//           Login
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Navbar;

// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
      setIsDropdownOpen(false);
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="navbar bg-base-100 shadow-lg sticky top-0 z-50">
      <div className="navbar-start">
        <Link to="/" className="btn btn-ghost text-xl">
          🎮 ToyTopia
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/" className={isActive("/") ? "active font-bold" : ""}>
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/my-profile"
              className={isActive("/my-profile") ? "active font-bold" : ""}
            >
              My Profile
            </Link>
          </li>
        </ul>
      </div>

      <div className="navbar-end">
        {currentUser ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <div className="w-10 rounded-full">
                <img
                  alt="User profile"
                  src={
                    currentUser.photoURL ||
                    "https://via.placeholder.com/40x40?text=U"
                  }
                />
              </div>
            </div>
            {isDropdownOpen && (
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
              >
                <li className="px-4 py-2">
                  <span className="text-sm font-semibold">
                    {currentUser.displayName || "User"}
                  </span>
                </li>
                <li>
                  <hr className="my-1" />
                </li>
                <li>
                  <Link
                    to="/my-profile"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    My Profile
                  </Link>
                </li>
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </ul>
            )}
          </div>
        ) : (
          <Link to="/login" className="btn btn-primary">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
