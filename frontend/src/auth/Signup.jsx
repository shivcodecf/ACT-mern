import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    terms: false,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // 🔍 Validation
  const validate = () => {
    const newErrors = {};

    if (!form.name) {
      newErrors.name = "Name is required";
    }

    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!form.terms) {
      newErrors.terms = "You must accept terms";
    }

    return newErrors;
  };

  // 🚀 Submit
  const submitHandler = async () => {
    const validationErrors = validate();
    const apiUrl = import.meta.env.VITE_API_URL;

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `${apiUrl}/api/auth/signup`,
        {
          name: form.name,
          email: form.email,
          password: form.password,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data.success) {
        navigate("/login");
      }
    } catch (err) {
      setErrors({
        general:
          err.response?.data?.message || "Signup failed",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex">
      
      {/* LEFT SIDE */}
      <div className="hidden md:flex w-1/2 bg-gray-900 text-white items-center justify-center p-10">
        <div>
          <h1 className="text-4xl font-bold mb-4">Join Us 🚀</h1>
          <p className="text-gray-400">
            Create your account and start managing your workflow efficiently.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-gray-50">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">

          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Create your account
          </h2>

          {/* Name */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Full Name"
              value={form.name}
              className={`w-full p-3 border rounded-lg ${
                errors.name ? "border-red-500" : "focus:ring-2 focus:ring-indigo-500"
              }`}
              onChange={(e) => {
                setForm({ ...form, name: e.target.value });
                setErrors({ ...errors, name: "" });
              }}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              className={`w-full p-3 border rounded-lg ${
                errors.email ? "border-red-500" : "focus:ring-2 focus:ring-indigo-500"
              }`}
              onChange={(e) => {
                setForm({ ...form, email: e.target.value });
                setErrors({ ...errors, email: "" });
              }}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              value={form.password}
              className={`w-full p-3 border rounded-lg ${
                errors.password ? "border-red-500" : "focus:ring-2 focus:ring-indigo-500"
              }`}
              onChange={(e) => {
                setForm({ ...form, password: e.target.value });
                setErrors({ ...errors, password: "" });
              }}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Terms */}
          <div className="mb-4">
            <label className="flex items-center text-sm text-gray-600">
              <input
                type="checkbox"
                className="mr-2"
                checked={form.terms}
                onChange={(e) => {
                  setForm({ ...form, terms: e.target.checked });
                  setErrors({ ...errors, terms: "" });
                }}
              />
              I agree to Terms & Conditions
            </label>
            {errors.terms && (
              <p className="text-red-500 text-sm mt-1">{errors.terms}</p>
            )}
          </div>

          {/* General Error */}
          {errors.general && (
            <p className="text-red-500 text-sm mb-3">{errors.general}</p>
          )}

          {/* Button */}
          <button
            onClick={submitHandler}
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white ${
              loading
                ? "bg-gray-400"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {loading ? "Creating..." : "Create Account"}
          </button>

          {/* Login */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-indigo-600 cursor-pointer hover:underline"
            >
              Sign in
            </span>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Signup;