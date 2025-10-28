// src/pages/MyProfile.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const MyProfile = () => {
  const { currentUser, updateUserProfile, logout } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    displayName: "",
    photoURL: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (currentUser) {
      setFormData({
        displayName: currentUser.displayName || "",
        photoURL: currentUser.photoURL || "",
      });
    }
  }, [currentUser]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      await updateUserProfile(formData);
      setMessage("Profile updated successfully!");
    } catch (error) {
      setError("Failed to update profile: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      setError("Failed to log out: " + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">My Profile</h1>

          <div className="bg-base-100 rounded-xl shadow-md p-8 mb-8">
            <div className="flex flex-col items-center mb-6">
              <img
                src={
                  currentUser?.photoURL ||
                  "https://via.placeholder.com/100x100?text=U"
                }
                alt="Profile"
                className="w-24 h-24 rounded-full mb-4"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/100x100?text=U";
                }}
              />
              <h2 className="text-xl font-semibold">
                {currentUser?.displayName || "User"}
              </h2>
              <p className="text-gray-600">{currentUser?.email}</p>
            </div>

            {error && (
              <div className="alert alert-error mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{error}</span>
              </div>
            )}
            {message && (
              <div className="alert alert-success mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{message}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 mb-6">
              <div>
                <label
                  htmlFor="displayName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Display Name
                </label>
                <input
                  type="text"
                  id="displayName"
                  name="displayName"
                  className="input input-bordered w-full mt-1"
                  value={formData.displayName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  htmlFor="photoURL"
                  className="block text-sm font-medium text-gray-700"
                >
                  Photo URL
                </label>
                <input
                  type="url"
                  id="photoURL"
                  name="photoURL"
                  className="input input-bordered w-full mt-1"
                  value={formData.photoURL}
                  onChange={handleChange}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-full"
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Updating...
                  </>
                ) : (
                  "Update Profile"
                )}
              </button>
            </form>

            {/* Logout Button Section */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4">Account Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={handleLogout}
                  className="btn btn-error w-full gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Logout from Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
