import Recipe from "../models/Recipe.js";

// Get all recipes
export const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.findAll();
    res.json(recipes);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get a single recipe by ID
export const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findByPk(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.json(recipe);
  } catch (error) {
    console.error("Error fetching recipe:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Create a new recipe with image upload
export const createRecipe = async (req, res) => {
  try {
    const { title, description, ingredients, instructions } = req.body;
    const image = req.file ? req.file.path : null; // Get the uploaded image path

    const newRecipe = await Recipe.create({
      title,
      description,
      ingredients,
      instructions,
      image,
    });

    res.status(201).json(newRecipe);
  } catch (error) {
    console.error("Error creating recipe:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update a recipe with image upload
export const updateRecipe = async (req, res) => {
  try {
    const { title, description, ingredients, instructions } = req.body;
    const image = req.file ? req.file.path : null; // Get the uploaded image path

    const recipe = await Recipe.findByPk(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    await recipe.update({
      title,
      description,
      ingredients,
      instructions,
      image: image || recipe.image, // Keep the existing image if no new image is uploaded
    });

    res.json(recipe);
  } catch (error) {
    console.error("Error updating recipe:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete a recipe by ID
export const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findByPk(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    await recipe.destroy();
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting recipe:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};