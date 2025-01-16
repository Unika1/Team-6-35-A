import React from "react";
import { Link } from "react-router-dom";
import '../../styles/Navbar.css';

const Navbar = () => {
  return (
    <div className="navbar">
      <h2>JOJO'S RECEIPE BOOK</h2>
      <div className="nav-description">
        <div className="home">Home</div>
        <div className="about">About Us</div>
        <div className="recipes">Recipes</div>
        <div className="contact">Contact Us</div>
        <div className="profile">
          <i className="fa-solid fa-user"></i>
          <div className="account">Account
            <div className="drop-down">
              <Link to="/login">Login</Link>
              <Link to="/signup">SignUp</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
