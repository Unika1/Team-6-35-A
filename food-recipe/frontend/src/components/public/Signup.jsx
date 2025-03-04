// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios"; 
// import "../../styles/Signup.css";

// const Signup = () => {
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");  // To store error messages
//   const [loading, setLoading] = useState(false);  // To handle loading state
//   const navigate = useNavigate();

//   const validateEmail = (email) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(""); // Reset error message on new submit attempt
//     setLoading(true); // Set loading state to true

//     // Input Validation
//     if (!username || !email || !password) {
//       setError("All fields are required!");
//       setLoading(false); // Reset loading state
//       return;
//     }

//     if (!validateEmail(email)) {
//       setError("Invalid email format!");
//       setLoading(false); // Reset loading state
//       return;
//     }

//     if (password.length < 6) {
//       setError("Password must be at least 6 characters long!");
//       setLoading(false); // Reset loading state
//       return;
//     }

//     // Try making the API request to the backend
//     try {
//       const response = await axios.post("http://localhost:5000/api/users/signup", {
//         username,
//         email,
//         password,
//       });

//       // Handle success response
//       alert(response.data.message);
//       navigate("/login"); // Redirect to login page
//     } catch (err) {
//       // Handle error response
//       if (err.response) {
//         setError(err.response.data.error || "Something went wrong.");
//       } else {
//         setError("Something went wrong. Please try again.");
//       }
//     } finally {
//       setLoading(false); // Reset loading state
//     }
//   };

//   return (
//     <div className="container">
//       <div className="auth-container">
//         <h1>JOJO'S RECIPE BOOK</h1>
//         <h2>SIGNUP</h2>
//       </div>
//       <div className="auth-box">
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label htmlFor="username">Username</label>
//             <input
//               type="text"
//               id="username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               placeholder="Enter your username"
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="email">Email</label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Enter your email"
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="password">Password</label>
//             <input
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Enter your password"
//               required
//             />
//           </div>
//           <button type="submit" className="signup-btn" disabled={loading}>
//             {loading ? "Signing up..." : "Sign Up"}
//           </button>
//         </form>

//         {error && <div className="error-message">{error}</div>}

//         <div className="form-footer">
//           <p>
//             Already have an account? <a href="/login">LOGIN</a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signup;
