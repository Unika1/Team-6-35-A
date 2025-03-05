import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getRecipeById } from '../../../services/recipeService';
import '../../../styles/RecipePage.css';
import Navbar from './Navbar';

const RecipePage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      const data = await getRecipeById(id);
      setRecipe(data);
    };

    fetchRecipe();
  }, [id]);

  return (
    <>
      <Navbar />
      <div className="recipe-page">
        {recipe ? (
          <>
            <h2>{recipe.title}</h2>
            <img src={recipe.imageUrl} alt={recipe.title} />
            <p>{recipe.description}</p>
            <h3>Ingredients</h3>
            <p>{recipe.ingredients}</p>
            <h3>Steps</h3>
            <p>{recipe.steps}</p>
            <div className="recipe-actions">
              <Link to={`/recipe/${id}/reviews`} className="view-reviews-btn">
                View Reviews
              </Link>
            </div>
          </>
        ) : (
          <p>Loading recipe...</p>
        )}
      </div>
    </>
  );
};

export default RecipePage;
