import axios from "axios";

const API_URL = "http://localhost:8080/api/recipes";

// Fetch all recipes
export const getAllRecipes = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    throw error;
  }
};

// Fetch a single recipe by ID
export const getRecipeById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching recipe with ID ${id}:`, error);
    throw error;
  }
};

// Create a new recipe with image upload
export const createRecipe = async (recipeData) => {
  try {
    const formData = new FormData();
    formData.append("title", recipeData.title);
    formData.append("description", recipeData.description);
    formData.append("ingredients", recipeData.ingredients);
    formData.append("instructions", recipeData.instructions);
    if (recipeData.image) {
      formData.append("image", recipeData.image);
    }

    const response = await axios.post(`${API_URL}/create`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating recipe:", error);
    throw error;
  }
};

// Update a recipe with image upload
export const updateRecipe = async (id, recipeData) => {
  try {
    const formData = new FormData();
    formData.append("title", recipeData.title);
    formData.append("description", recipeData.description);
    formData.append("ingredients", recipeData.ingredients);
    formData.append("instructions", recipeData.instructions);
    if (recipeData.image) {
      formData.append("image", recipeData.image);
    }

    const response = await axios.put(`${API_URL}/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating recipe with ID ${id}:`, error);
    throw error;
  }
};

// Delete a recipe by ID
export const deleteRecipe = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting recipe with ID ${id}:`, error);
    throw error;
  }
};