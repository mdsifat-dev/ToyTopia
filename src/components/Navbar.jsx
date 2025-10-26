import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="navbar bg-base-100 shadow-lg sticky top-0 z-50">
      <div className="navbar-start">
        <Link to="/" className="btn btn-ghost text-xl">
          🎮 ToyTopia
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-3">
          <li>
            <Link
              to="/"
              className={
                isActive("/") ? "active btn btn-primary font-bold" : ""
              }
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/my-profile"
              className={
                isActive("/my-profile")
                  ? "active btn btn-primary font-bold"
                  : ""
              }
            >
              My Profile
            </Link>
          </li>
        </ul>
      </div>

      <div className="navbar-end">
        <Link to="/login" className="btn btn-primary">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
