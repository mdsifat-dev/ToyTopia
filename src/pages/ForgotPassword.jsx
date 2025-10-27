// // src/pages/ForgotPassword.jsx
// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// const ForgotPassword = () => {
//   const [email, setEmail] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert(
//       "Password reset functionality will be implemented with Firebase authentication."
//     );
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-base-200 py-12 px-4">
//       <div className="max-w-md w-full space-y-8">
//         <div>
//           <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
//             Reset Your Password
//           </h2>
//           <p className="mt-2 text-center text-sm text-gray-600">
//             Enter your email and we'll send you a link to reset your password.
//           </p>
//         </div>
//         <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//           <div className="form-control">
//             <input
//               type="email"
//               required
//               className="input input-bordered w-full"
//               placeholder="Email address"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>

//           <div>
//             <button type="submit" className="btn btn-primary w-full text-white">
//               Send Reset Link
//             </button>
//           </div>

//           <div className="text-center">
//             <Link to="/login" className="text-primary hover:underline">
//               Back to Login
//             </Link>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ForgotPassword;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { resetPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Please enter your email address");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setMessage("");
      await resetPassword(email);
      setMessage("Check your email for further instructions.");
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
            Reset Your Password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter your email and we'll send you a link to reset your password.
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="alert alert-error">
              <span>{error}</span>
            </div>
          )}
          {message && (
            <div className="alert alert-success">
              <span>{message}</span>
            </div>
          )}

          <div className="form-control">
            <input
              type="email"
              required
              className="input input-bordered w-full"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full text-white"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </div>

          <div className="text-center">
            <Link to="/login" className="text-primary hover:underline">
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
