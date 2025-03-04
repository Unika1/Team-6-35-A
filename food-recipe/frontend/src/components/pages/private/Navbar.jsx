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
        <Link to="/recipe">Recipes</Link>
        <Link to="/reviews">Reviews</Link>
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