import React, { useState, useEffect } from "react";
import { getAllRecipes } from "../../../services/recipeService";
import "../../../styles/Recipe.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Recipes = () => {
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
    <div className="recipes">
      <Navbar />
      <h2>All Recipes</h2>
      <div className="recipe-list">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <div key={recipe.id} className="recipe-item">
              {/* Image and Title */}
              <div className="recipe-header">
                {recipe.image && (
                  <img
                    src={`http://localhost:5000/${recipe.image}`}
                    alt={recipe.title}
                    className="recipe-image"
                  />
                )}
                <h3 className="recipe-title">{recipe.title}</h3>
              </div>

              {/* Description */}
              <p className="recipe-description">{recipe.description}</p>

              {/* Ingredients and Instructions */}
              <div className="recipe-details">
                <div className="recipe-ingredients">
                  <h4>Ingredients:</h4>
                  <ul>
                    {recipe.ingredients.split(',').map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                    ))}
                  </ul>
                </div>
                <div className="recipe-instructions">
                  <h4>Instructions:</h4>
                  <p>{recipe.instructions}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No recipes available.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Recipes;