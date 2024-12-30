import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/AuthContext";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { user, setUser } = useContext(UserDataContext);

  const navigate = useNavigate();

  const signupHandler = async (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-7 rounded-lg shadow-lg w-full max-w-md">
          <h3 className="text-3xl text-center font-semibold mb-6">Signup</h3>
          <form onSubmit={(e) => signupHandler(e)}>
            <label className="text-lg font-medium mb-2">Your Name:</label>
            <input
              className="border border-gray-300 p-3 rounded-md w-full mb-4"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Bishal Singh"
            />
            <label className="text-lg font-medium mb-2">What's Your Email</label>
            <input
              className="border border-gray-300 p-3 rounded-md w-full mb-4"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="email@example.com"
            />
            <label className="text-lg font-medium mb-2">Enter Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 p-3 rounded-md w-full mb-6"
              required
              placeholder="password"
            />
            <button type="submit" className="bg-blue-500 text-white p-3 rounded-md w-full hover:bg-blue-600 transition duration-300">
              Signup
            </button>
          </form>
          <p className="text-center mt-4">
            Have an Account?{" "}
            <Link to="/auth/login" className="text-blue-600 hover:underline">
              Login Here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;
