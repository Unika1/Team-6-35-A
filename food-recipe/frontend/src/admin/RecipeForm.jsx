import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createRecipe, getRecipeById, updateRecipe } from "../services/recipeService";
import "../styles/RecipeForm.css";

const RecipeForm = ({ isEditMode }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [image, setImage] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch recipe data if in edit mode
  useEffect(() => {
    if (isEditMode && id) {
      const fetchRecipe = async () => {
        try {
          const recipe = await getRecipeById(id);
          setTitle(recipe.title);
          setDescription(recipe.description);
          setIngredients(recipe.ingredients);
          setInstructions(recipe.instructions);
        } catch (error) {
          console.error("Error fetching recipe:", error);
        }
      };
      fetchRecipe();
    }
  }, [isEditMode, id]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const recipeData = {
      title,
      description,
      ingredients,
      instructions,
      image,
    };

    try {
      if (isEditMode && id) {
        await updateRecipe(id, recipeData);
      } else {
        await createRecipe(recipeData);
      }
      navigate("/admin");
    } catch (error) {
      console.error("Error saving recipe:", error);
    }
  };

  return (
    <div className="recipe-form-container">
      <h2>{isEditMode ? "Edit Recipe" : "Add New Recipe"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Ingredients</label>
          <textarea
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Instructions</label>
          <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Image</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="submit-btn">
            {isEditMode ? "Update Recipe" : "Add Recipe"}
          </button>
          <button
            type="button"
            className="back-btn"
            onClick={() => navigate("/admin")}
          >
            Back to Recipe Dashboard
          </button>
        </div>
      </form>
    </div>
  );
};

export default RecipeForm;