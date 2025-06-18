import React, { useContext, useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import logo from "../assets/logo.jpg"; // ✅ Adjusted as per your path
import axios from "axios";
import authContext from "../context/authContext";
import { useNavigate } from "react-router-dom";
import {createContext} from 'react'



const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleSignin = async (e) => {
    
    e.preventDefault();

    try {
      const res = await axios.post(
        'http://localhost:5000/api/auth/login',
        { email, password },
        { withCredentials: true }
      );{
        login(Response.data.user)
        localStorage.setItem("token", Response.data.token)
        if(Response.data.user.role === "admin") {
          navigate('/admin-dashboard')
        }else {
          navigate("/employee-dashboard")
        }
      }

      console.log("✅ Login Response:", res);
      console.log("🔑 Token:", res.data.token); // You can access the token directly

      // Optional: Save token in localStorage
      // localStorage.setItem("token", res.data.token);

    } catch (err) {
      console.error("❌ Login Error:", err);
    }

    console.log("📧 Email:", email);
    console.log("🔒 Password:", password);
  };

  return (
    <div className="w-screen h-screen bg-white flex flex-col items-center justify-start">
      {/* Header */}
      <div className="w-full h-[30%] bg-cyan-500 rounded-b-[50px] relative flex flex-col items-center justify-center">
        <button className="absolute top-5 right-5 text-sm bg-white text-cyan-500 px-3 py-1 rounded-full shadow-md">
          Admin Login
        </button>
        <div className="bg-white p-4 rounded-2xl shadow-lg mt-10">
          <img src={logo} alt="Logo" className="w-16 h-16 mx-auto" />
        </div>
      </div>

      {/* Login Form */}
      <form onSubmit={handleSignin} className="mt-8 p-6 w-full max-w-xs bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4 text-center">Login</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <div className="flex items-center justify-between mb-4">
          <label className="flex items-center text-sm">
            <input type="checkbox" className="mr-2" />
            Remember me
          </label>
          <a href="#" className="text-sm text-cyan-500">Forgot password?</a>
        </div>

        <button
          type="submit"
          className="w-full bg-cyan-500 text-white py-2 rounded-md hover:bg-cyan-600 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};


export default Login;
