import React from "react";
import { Link } from "react-router-dom";
import "../../../styles/Navbar.css";
import { FaUser } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="navbar">
      <h2>JOJO'S RECIPE BOOK</h2>
      
      <div className="nav-description">
        <Link to="/home">Home</Link>
        <Link to="/about">About Us</Link>
        <Link to="/recipe/:id">Recipes</Link>
        <div className="contact"><a href="#contactUs">Contact Us</a></div>
        <div className="profile">
          <Link to="/">
            <FaUser />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;