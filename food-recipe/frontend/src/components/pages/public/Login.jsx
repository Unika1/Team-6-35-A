import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";  
import axios from "axios";  
import '../../../styles/Login.css';

const Login = () => {
  const [email, setEmail] = useState("");  
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);  
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/users/login', {
        email,
        password
      });

      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem("role", user.role);

      alert("Login successful!");

      if (user.role === "admin") {
        navigate("/admin");  
      } else {
        navigate("/home");
      }
      
    } catch (error) {
      setError(error.response?.data?.error || "An error occurred, please try again.");
      alert(error.response?.data?.error || "Invalid credentials, please try again.");
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
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}  
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
        {error && <div className="error">{error}</div>} 
        <div className="signup">
          Don't have an account? <Link to="/signup">SIGNUP</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
