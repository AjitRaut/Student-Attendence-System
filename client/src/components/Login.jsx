import React, { useState } from "react";
import API from "../utils/Api";
import { Link, useNavigate } from "react-router-dom";
// import jwt_decode from "jwt-decode";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", data.token);
      if (data.role === "student") {
        navigate("/student");
      } else if (data.role === "teacher") {
        navigate("/teacher");
      } else {
        alert("Invalid role!");
      }
    } catch (err) {
      alert("Login failed! Check credentials.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg shadow-md w-96"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
        <p className="text-center mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register Here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
