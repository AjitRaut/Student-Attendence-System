import React, { useState } from "react";
import API from "../utils/Api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", formData);
      navigate("/");
    } catch (err) {
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-96"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Register</h2>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          value={formData.password}
          onChange={handleChange}
        />
        <select
          name="role"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          value={formData.role}
          onChange={handleChange}
        >
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>
        <button
          type="submit"
          className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
