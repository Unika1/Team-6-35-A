import React from "react";
import '../../styles/FrontSection.css';
import frontImage from '../../assets/images/frontimage.png';

function FrontSection() {
    return (
        <div className="front">
            <div className="front-image">
                <img src={frontImage} alt="Front Image" />
            </div>

            <div className="front-description">
                <h2>Discover Culinary Delights</h2>
                <p>
                    Explore mouthwatering recipes from around the world, whether you're a beginner or a pro in the kitchen. <br/>
                    From quick and easy meals to gourmet delights, we’ve got you covered. <br/>
                    Dive into step-by-step instructions, detailed ingredients, and expert cooking tips to make every dish perfect.
                </p>

                <ul>
                    <li className="list-heading">✨ What You’ll Find:</li>
                    <li>✔️ Delicious & easy-to-follow recipes</li>
                    <li>✔️ Healthy meal ideas & diet-friendly options</li>
                    <li>✔️ Trending & seasonal dishes</li>
                    <li>✔️ Cooking tips & kitchen hacks</li>
                </ul>

                {/* Enhanced Explore Dishes Section - No Button */}
                <div className="explore-dishes">
                    <h1>🍽️ Explore Dishes</h1>
                </div>
            </div>
        </div>
    );
}

export default FrontSection;
