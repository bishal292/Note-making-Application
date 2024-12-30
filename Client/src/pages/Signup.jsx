import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/AuthContext";
import { SIGNUP_ROUTE } from "../lib/constant";
import { ApiClient } from "../lib/ApiClient";

const Signup = () => {
  const [userName, setUserName] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { setUser } = useContext(UserDataContext);

  const navigate = useNavigate();

  const signupHandler = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await ApiClient.post(SIGNUP_ROUTE, {
        userName,
        email,
        password,
      });

      console.log(response);
      if(response.status === 201){
        setUser(response.data.user);
        
        setEmail("");
        setPassword("");
        setUserName("");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }finally{
      setIsSubmitting(false);
    }
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
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
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
            <button
              type="submit"
              className={`${
                isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
              } text-white p-3 rounded-md w-full transition duration-300`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Siguup'}
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
