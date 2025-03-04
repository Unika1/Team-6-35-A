import React from 'react';
import '../../../styles/AboutUs.css';
import chiefLogo from '../../../assets/images/chief.png';
import shreetika from '../../../assets/images/shreetika.jpg';
import dipika from '../../../assets/images/dipika.png';
import sabina from '../../../assets/images/sabina.png';
import deepa from '../../../assets/images/deepa.jpeg';
import unika from '../../../assets/images/unika.jpg';
import dalbhaat from '../../../assets/images/dalbhaat.jpg';
import kheer from '../../../assets/images/kheer.jpg';
import nepalifood from '../../../assets/images/nepalifood.jpeg';
import newari from '../../../assets/images/newari.jpg';
import gundruk from '../../../assets/images/gundruk.jpg';
import Navbar from './Navbar';
import Footer from './Footer';

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <Navbar/>
      <header className="chief-logo">
        <img src={chiefLogo} alt="Chief Logo" />
      </header>

      <section className="title-container">
        <h1>A little about JoJo's Recipe Book</h1>
      </section>

      <section className="author-container">
        <div className="written">
          <p>We are thrilled to introduce our Nepali Cuisine Recipe Book...</p>
        </div>
        <div className="deepaunika">
          <div>
            <h3>SHREETIKA SHRESTHA</h3>
            <img src={shreetika} alt="Shreetika" />
          </div>
          <div>
            <h3>DIPIKA MAHARJAN</h3>
            <img src={dipika} alt="Dipika" />
          </div>
          <div>
            <h3>SABINA KHANAL</h3>
            <img src={sabina} alt="Sabina" />
          </div>
          <div>
            <h3>DEEPA POUDEL</h3>
            <img src={deepa} alt="Deepa" />
          </div>
          <div>
            <h3>UNIKA PARAJULI</h3>
            <img src={unika} alt="Unika" />
          </div>
        </div>
      </section>

      <section className="food-container">
        <h2>Favorite Food</h2>
        <p>Explore our favorite recipes...</p>
        <div className="food-images">
          <img src={dalbhaat} alt="Dal Bhaat" />
          <img src={kheer} alt="Kheer" />
          <img src={nepalifood} alt="Nepali Food" />
          <img src={newari} alt="Newari Food" />
          <img src={gundruk} alt="Gundruk" />
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
