import React, { useEffect, useState } from "react";
import { getAllRecipes } from "../../../services/recipeService";
import "../../../styles/Homepage.css";
import Navbar from "./Navbar";
import FrontSection from "./FrontSection";
import Footer from "./Footer";

const Homepage = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const data = await getAllRecipes();
        setRecipes(data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div className="homepage">
      <Navbar />
      <div className="front-section">
        <FrontSection />
      </div>
      <div className="recipes-section">
        <h1>Recipes</h1>
        <div className="recipe-list">
          {recipes.length > 0 ? (
            recipes.map((recipe) => (
              <div key={recipe.id} className="recipe-item">
                <h2>{recipe.title}</h2>
                {recipe.image && (
                  <img
                    src={`http://localhost:5000/${recipe.image}`}
                    alt={recipe.title}
                    className="recipe-image"
                  />
                )}
                <p>{recipe.description}</p>
                <div className="recipe-details">
                  <div className="ingredients">
                    <h3>Ingredients</h3>
                    <p>{recipe.ingredients}</p>
                  </div>
                  <div className="instructions">
                    <h3>Instructions</h3>
                    <p>{recipe.instructions}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No recipes available.</p>
          )}
        </div>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};

export default Homepage;