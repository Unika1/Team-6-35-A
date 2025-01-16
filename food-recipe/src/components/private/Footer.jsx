import React from "react";
import '../../styles/Footer.css';

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
          <p>Let's Be Friends!</p>
          <a href="#"><i className="fa-brands fa-facebook"></i> Facebook</a>
          <a href="#"><i className="fa-brands fa-instagram"></i> Instagram</a>
          <a href="#"><i className="fa-brands fa-youtube"></i> YouTube</a>
        </ul>
      </div>

      <div className="footer2">
        JOJO'S RECIPES © 2025
      </div>
    </footer>
  );
};

export default Footer;
