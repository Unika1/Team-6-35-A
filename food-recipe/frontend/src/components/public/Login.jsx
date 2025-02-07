import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";  // Import useNavigate
import '../../styles/Login.css';

const Login = () => {
  const [email, setEmail] = useState("");  // Updated state for email
  const [password, setPassword] = useState("");
  const navigate = useNavigate();  // Initialize navigate

  const handleSubmit = (e) => {
    e.preventDefault();

    // Retrieve stored user data from localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      alert("No account found! Please sign up first.");
      navigate("/signup");  // Redirect to the signup page
      return;
    }

    // Validate user credentials
    if (email === storedUser.email && password === storedUser.password) {  // Compare email instead of username
      alert("Login successful! Redirecting to the dashboard...");
      navigate("/homepage");  // Redirect to the homepage
    } else {
      alert("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="container">
      <div className="login-container">
        <h1>JOJO'S RECIPE BOOK</h1>
        <h2>LOGIN</h2>
      </div>
      <div className="login-box">
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>  {/* Changed label to Email */}
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}  // Updated onChange
            placeholder="Enter your email"
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
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
