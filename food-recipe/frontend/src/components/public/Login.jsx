import React from "react";
import { Link } from "react-router-dom";
import '../../styles/Login.css';

const Login = () => {
  return (
    <div className="container">
      <div className="login-container">
        <h1>JOJO'S RECIPE BOOK</h1>
        <h2>LOGIN</h2>
      </div>
      <div className="login-box">
        <form>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" placeholder="Enter your username" />
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Enter your password" />
          <button type="submit">Log In</button>
        </form>
        <div className="signup">
          Don't have an account? <Link to="/signup">SIGNUP</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
