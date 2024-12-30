import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/AuthContext";
import { ApiClient } from "../lib/ApiClient";
import { LOGIN_ROUTE } from "../lib/constant";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setisSubmitting] = useState(false);

  const { setUser } = useContext(UserDataContext);

  const navigate = useNavigate();


  const loginHandler = async (e) => {
    e.preventDefault();
    setisSubmitting(true);

    try {
      const response = await ApiClient.post(LOGIN_ROUTE, {
        email,
        password,
      });
      console.log(response);
      if (response.status === 200) {
        setUser(response.data.user);
        setEmail("");
        setPassword("");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setisSubmitting(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-7 rounded-lg shadow-lg w-full max-w-md">
          <h3 className="text-3xl text-center font-semibold mb-6">Login</h3>
          <form onSubmit={loginHandler}>
            <label className="text-lg font-medium mb-2">
              What's Your Email
            </label>
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
            <button
              type="submit"
              className={`${
                isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
              } text-white p-3 rounded-md w-full transition duration-300`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Login'}
            </button>
          </form>
          <p className="text-center mt-4">
            New Here?...
            <Link to="/auth/signup" className="text-blue-600 hover:underline">
              Sign Up here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
