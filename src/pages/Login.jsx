import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login, googleLogin, currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (currentUser) {
      navigate(from, { replace: true });
    }
  }, [currentUser, navigate, from]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      setError("");
      await login(formData.email, formData.password);
    } catch (error) {
      setError("Failed to log in: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError("");
      await googleLogin();
    } catch (error) {
      setError("Failed to log in with Google: " + error.message);
    } finally {
      setLoading(false);
    }
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
          {error && (
            <div className="alert alert-error">
              <span>{error}</span>
            </div>
          )}

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
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full text-white"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </div>

          <div className="divider">OR</div>

          <div>
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading}
              className="btn btn-outline w-full"
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
