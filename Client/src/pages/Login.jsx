import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { user, setUser } = useContext(UserDataContext);

  const navigate = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();

  };

  return (
    <div className="auth-Controller">
      <h3>Login Page </h3>
      <div className="form-container">
        <form onSubmit={(e) => loginHandler(e)}>
          <h3 className="text-lg font-medium mb-2 input-heading">
            What's Your Email
          </h3>
          <input
            className="input-fields"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="email@example.com"
          />
          <h3 className="input-heading">Enter Password</h3>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-fields"
            required
            placeholder="password"
          />
          <button type="submit" className="btn">
            Login
          </button>
        </form>
        <p className="alternate-auth">
          New Here?...
          <Link to="/auth/signup" className="text-blue-600">
            Create An Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
