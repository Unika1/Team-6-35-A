// (Component to display a single recipe on the homepage)

import React from 'react';
import { Link } from 'react-router-dom';
import '../../../styles/RecipeCard.css';

const RecipeCard = ({ recipe }) => {
  return (
    <div className="recipe-card">
      <img src={recipe.imageUrl} alt={recipe.title} className="recipe-image" />
      <h3>{recipe.title}</h3>
      <p>{recipe.description.substring(0, 100)}...</p>
      <Link to={`/recipe/${recipe.id}`} className="view-recipe-link">View Recipe</Link>
    </div>
  );
};

export default RecipeCard;