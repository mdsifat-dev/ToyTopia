// src/pages/ToyDetails.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toysData from "../data/toys.json";

const ToyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [toy, setToy] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  // Set user data when component mounts or user changes
  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser.displayName || "",
        email: currentUser.email || "",
      });
    }
  }, [currentUser]);

  // Find the toy data
  useEffect(() => {
    const foundToy = toysData.find((t) => t.toyId === parseInt(id));
    if (foundToy) {
      setToy(foundToy);
    } else {
      navigate("/404");
    }
  }, [id, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      "Your request has been submitted successfully! We will contact you soon."
    );
    setFormData({
      name: currentUser?.displayName || "",
      email: currentUser?.email || "",
    });
  };

  if (!toy) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg text-primary"></div>
          <p className="mt-4 text-gray-600">Loading toy details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-12">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="text-sm breadcrumbs mb-6">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/">Toys</Link>
            </li>
            <li className="text-primary">{toy.toyName}</li>
          </ul>
        </div>

        <div className="max-w-6xl mx-auto bg-base-100 rounded-xl shadow-md overflow-hidden">
          <div className="md:flex">
            <div className="md:flex-shrink-0 md:w-1/2">
              <img
                className="h-64 w-full object-contain md:h-full md:max-h-96 "
                src={toy.pictureURL}
                alt={toy.toyName}
              />
            </div>
            <div className="p-8 md:w-1/2">
              <div className="uppercase tracking-wide text-sm text-primary font-semibold mb-2">
                {toy.subCategory}
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                {toy.toyName}
              </h1>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {toy.description}
              </p>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-primary">
                    ${toy.price}
                  </span>
                  <div className="flex items-center bg-yellow-100 px-3 py-1 rounded-full">
                    <span className="text-yellow-500 text-lg">⭐</span>
                    <span className="ml-1 font-semibold text-gray-700">
                      {toy.rating}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <p>
                    <strong className="text-gray-700">Seller:</strong>{" "}
                    {toy.sellerName}
                  </p>
                  <p>
                    <strong className="text-gray-700">
                      Available Quantity:
                    </strong>
                    <span
                      className={`ml-2 ${
                        toy.availableQuantity > 10
                          ? "text-green-600"
                          : "text-orange-600"
                      }`}
                    >
                      {toy.availableQuantity} items
                    </span>
                  </p>
                  <p>
                    <strong className="text-gray-700">Seller Email:</strong>{" "}
                    {toy.sellerEmail}
                  </p>
                </div>
              </div>

              <div className="flex space-x-4 gap-2">
                <button className="btn btn-primary flex-1 text-white">
                  Add to Cart
                </button>
                <button className="btn btn-outline btn-secondary flex-1">
                  Save for Later
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Try Now Form */}
        <div className="max-w-4xl mx-auto mt-8 bg-base-100 rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Try This Toy Now!
          </h2>
          <p className="text-gray-600 mb-6">
            Fill out the form below and we'll contact you to arrange a trial of
            this amazing toy!
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label htmlFor="name" className="label">
                <span className="label-text font-semibold">Your Name</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="input input-bordered w-full"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="form-control">
              <label htmlFor="email" className="label">
                <span className="label-text font-semibold">Your Email</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="input input-bordered w-full"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn btn-primary w-full text-white">
              Try Now - Request Demo
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ToyDetails;
