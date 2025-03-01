//(Page showing details of a single recipe)

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getRecipeById } from '../../../services/recipeService';
import '../../../styles/RecipePage.css'

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
        </>
      ) : (
        <p>Loading recipe...</p>
      )}
    </div>
  );
};

export default RecipePage;
