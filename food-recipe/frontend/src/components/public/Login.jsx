// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";  
// import '../../styles/Login.css';

// const Login = () => {
//   const [email, setEmail] = useState("");  
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate(); 

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Retrieve stored user data from localStorage
//     const storedUser = JSON.parse(localStorage.getItem("user"));

//     if (!storedUser) {
//       alert("No account found! Please sign up first.");
//       navigate("/signup");  
//       return;
//     }

//     // Validate user credentials
//     if (email === storedUser.email && password === storedUser.password) {  
//       alert("Login successful! Redirecting to the dashboard...");
//       navigate("/home");
//     } else {
//       alert("Invalid email or password. Please try again.");
//     }
//   };

//   return (
//     <div className="container">
//       <div className="login-container">
//         <h1>JOJO'S RECIPE BOOK</h1>
//         <h2>LOGIN</h2>
//       </div>
//       <div className="login-box">
//         <form onSubmit={handleSubmit}>
//           <label htmlFor="email">Email</label> 
//           <input
//             type="email"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}    
//             placeholder="Enter your email"
//           />
//           <label htmlFor="password">Password</label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="Enter your password"
//           />
//           <button type="submit">Log In</button>
//         </form>
//         <div className="signup">
//           Don't have an account? <Link to="/signup">SIGNUP</Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
