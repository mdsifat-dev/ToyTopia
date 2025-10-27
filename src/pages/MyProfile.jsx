// // src/pages/MyProfile.jsx
// import React from "react";
// import { Link } from "react-router-dom";

// const MyProfile = () => {
//   return (
//     <div className="min-h-screen bg-base-200 py-12">
//       <div className="container mx-auto px-4">
//         <div className="max-w-2xl mx-auto text-center">
//           <div className="bg-base-100 rounded-xl shadow-md p-8">
//             <h1 className="text-3xl font-bold mb-4">My Profile</h1>
//             <p className="text-gray-600 mb-6">
//               Please log in to view and edit your profile information.
//             </p>
//             <div className="space-y-4">
//               <Link to="/login" className="btn btn-primary btn-wide text-white">
//                 Login to Continue
//               </Link>
//               <p className="text-sm text-gray-500">
//                 Don't have an account?{" "}
//                 <Link to="/register" className="text-primary hover:underline">
//                   Sign up here
//                 </Link>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MyProfile;

import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const MyProfile = () => {
  const { currentUser, updateUserProfile } = useAuth();
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
      setError(error.message);
    } finally {
      setLoading(false);
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
                <span>{error}</span>
              </div>
            )}
            {message && (
              <div className="alert alert-success mb-4">
                <span>{message}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
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
                {loading ? "Updating..." : "Update Profile"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
