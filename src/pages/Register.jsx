// // src/pages/Register.jsx
// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// const Register = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     photoURL: "",
//     password: "",
//     confirmPassword: "",
//   });
//   const [showPassword, setShowPassword] = useState(false);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert(
//       "Registration functionality will be implemented with Firebase authentication."
//     );
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-base-200 py-12 px-4">
//       <div className="max-w-md w-full space-y-8 bg-base-100 space-y-8 shadow  rounded-lg p-8">
//         <div>
//           <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
//             Create your account
//           </h2>
//         </div>
//         <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//           <div className="space-y-4">
//             <div className="form-control">
//               <input
//                 name="name"
//                 type="text"
//                 required
//                 className="input input-bordered w-full"
//                 placeholder="Full Name"
//                 value={formData.name}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="form-control">
//               <input
//                 name="email"
//                 type="email"
//                 required
//                 className="input input-bordered w-full"
//                 placeholder="Email address"
//                 value={formData.email}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="form-control">
//               <input
//                 name="photoURL"
//                 type="url"
//                 className="input input-bordered w-full"
//                 placeholder="Photo URL (optional)"
//                 value={formData.photoURL}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="form-control relative">
//               <input
//                 name="password"
//                 type={showPassword ? "text" : "password"}
//                 required
//                 className="input input-bordered w-full pr-10"
//                 placeholder="Password"
//                 value={formData.password}
//                 onChange={handleChange}
//               />
//               <button
//                 type="button"
//                 className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? "🙈" : "👁️"}
//               </button>
//             </div>
//             <div className="form-control">
//               <input
//                 name="confirmPassword"
//                 type="password"
//                 required
//                 className="input input-bordered w-full"
//                 placeholder="Confirm Password"
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//               />
//             </div>
//           </div>

//           <div>
//             <button type="submit" className="btn btn-primary w-full text-white">
//               Sign up
//             </button>
//           </div>

//           <div className="text-center">
//             <p>
//               Already have an account?{" "}
//               <Link
//                 to="/login"
//                 className="text-primary hover:underline font-bold"
//               >
//                 Sign in
//               </Link>
//             </p>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Register;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photoURL: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { signup, updateUserProfile } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const validatePassword = (password) => {
    const uppercase = /[A-Z]/.test(password);
    const lowercase = /[a-z]/.test(password);
    const length = password.length >= 6;
    return uppercase && lowercase && length;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!validatePassword(formData.password)) {
      setError(
        "Password must contain at least one uppercase letter, one lowercase letter, and be at least 6 characters long."
      );
      return;
    }

    try {
      setLoading(true);
      setError("");
      const { user } = await signup(formData.email, formData.password);

      if (formData.name || formData.photoURL) {
        await updateUserProfile({
          displayName: formData.name,
          photoURL: formData.photoURL,
        });
      }

      navigate("/");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Create your account
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
                name="name"
                type="text"
                required
                className="input input-bordered w-full"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
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
                name="photoURL"
                type="url"
                className="input input-bordered w-full"
                placeholder="Photo URL (optional)"
                value={formData.photoURL}
                onChange={handleChange}
              />
            </div>
            <div className="form-control relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                required
                className="input input-bordered w-full pr-10"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
            <div className="form-control">
              <input
                name="confirmPassword"
                type="password"
                required
                className="input input-bordered w-full"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full text-white"
            >
              {loading ? "Creating Account..." : "Sign up"}
            </button>
          </div>

          <div className="text-center">
            <Link to="/login" className="text-primary hover:underline">
              Already have an account? Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
