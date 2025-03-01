import React from "react";
import "../../../styles/Footer.css";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer>
      <div className="footer1">
        <ul>
          <p>Quick Links</p>
          <a href="/about-us">About Us</a>
          <a href="/terms">Terms of Service</a>
          <a href="/privacy-policy">Privacy Policy</a>
        </ul>

        <ul>
          <p id ="contactUs">Let's Be Friends!</p>
          <a href="#">
            <FaFacebook /> Facebook
          </a>
          <a href="#">
            <FaInstagram /> Instagram
          </a>
          <a href="#">
            <FaYoutube /> YouTube
          </a>
        </ul>
      </div>

      <div className="footer2">JOJO'S RECIPES © 2025</div>
    </footer>
  );
};

export default Footer;
