import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllRecipes, deleteRecipe } from "../services/recipeService";
import RecipeForm from "./RecipeForm";
import "../styles/AdminPanel.css";

const AdminPanel = () => {
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  // Fetch all recipes on component mount
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

  // Handle recipe deletion
  const handleDelete = async (id) => {
    try {
      await deleteRecipe(id);
      setRecipes(recipes.filter((recipe) => recipe.id !== id));
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  return (
    <div className="admin-panel">
      <h2>Admin Panel</h2>
      <Link to="/admin/add" className="add-recipe-btn">
        Add New Recipe
      </Link>

      <div className="recipe-list">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <div key={recipe.id} className="recipe-item">
              <h3>{recipe.title}</h3>
              {recipe.image && (
                <img
                  src={`http://localhost:5000/${recipe.image}`}
                  alt={recipe.title}
                  className="recipe-image"
                />
              )}
              <p>{recipe.description}</p>
              <div className="recipe-actions">
                <button onClick={() => handleDelete(recipe.id)}>Delete</button>
                <Link to={`/admin/edit/${recipe.id}`} className="edit-btn">
                  Edit
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p>No recipes available.</p>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;