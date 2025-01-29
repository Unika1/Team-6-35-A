import React from "react";
import '../../styles/Content.css';
import dalbhaat from '../../assets/images/dalbhaat.jpg';
import pakoda from '../../assets/images/pakoda.jpg';
import pickle from '../../assets/images/pickle.jpg';
import sekuwa from '../../assets/images/sekuwa.jpg';
import newari from '../../assets/images/newari.jpg';
import kwati from '../../assets/images/Kwati.jpg';
import gundruk from '../../assets/images/gundruk.jpg';
import kheer from '../../assets/images/kheer.jpg';

const Content = () => {
  return (
    <div className="content">

      <div className="shop-section">
        <div className="box">
          <div className="box-content">
            <h2>Staple Dishes</h2>
            <div className="box-image" style={{ backgroundImage: `url(${dalbhaat})` }}></div>
            <p>See more recipes</p>
          </div>
        </div>

        <div className="box">
          <div className="box-content">
            <h2>Snacks and Appetizers</h2>
            <div className="box-image" style={{ backgroundImage: `url(${pakoda})` }}></div>
            <p>See more recipes</p>
          </div>
        </div>

        <div className="box">
          <div className="box-content">
            <h2>Pickles and Condiments</h2>
            <div className="box-image" style={{ backgroundImage: `url(${pickle})` }}></div>
            <p>See more recipes</p>
          </div>
        </div>

        <div className="box">
          <div className="box-content">
            <h2>Non-Vegetarian Delicacies</h2>
            <div className="box-image" style={{ backgroundImage: `url(${sekuwa})` }}></div>
            <p>See more recipes</p>
          </div>
        </div>

        <div className="box">
          <div className="box-content">
            <h2>Traditional Newari Cuisine</h2>
            <div className="box-image" style={{ backgroundImage: `url(${newari})` }}></div>
            <p>See more recipes</p>
          </div>
        </div>

        <div className="box">
          <div className="box-content">
            <h2>Soups and Stews</h2>
            <div className="box-image" style={{ backgroundImage: `url(${kwati})` }}></div>
            <p>See more recipes</p>
          </div>
        </div>

        <div className="box">
          <div className="box-content">
            <h2>Specialty Regional Foods</h2>
            <div className="box-image" style={{ backgroundImage: `url(${gundruk})` }}></div>
            <p>See more recipes</p>
          </div>
        </div>

        <div className="box">
          <div className="box-content">
            <h2>Desserts</h2>
            <div className="box-image" style={{ backgroundImage: `url(${kheer})` }}></div>
            <p>See more recipes</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
