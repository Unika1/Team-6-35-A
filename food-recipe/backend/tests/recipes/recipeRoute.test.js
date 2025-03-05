import request from "supertest";
import express from "express";
import recipeRoutes from "../routes/recipeRoutes.js";
import Recipe from "../models/Recipe.js";
import multer from "multer";

// Mock Multer to bypass file upload handling in tests
jest.mock("multer", () => {
  const multer = () => ({
    single: () => (req, res, next) => next(),
  });
  multer.diskStorage = () => ({});
  return multer;
});

// Create an Express app instance
const app = express();
app.use(express.json());
app.use("/api/recipes", recipeRoutes);

// Mock the Recipe model's Sequelize methods
jest.mock("../models/Recipe.js");

describe("Recipe Routes", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mock history between tests
  });

  // Test: Get all recipes
  it("GET /api/recipes - should fetch all recipes", async () => {
    const mockRecipes = [
      { id: 1, title: "Recipe 1" },
      { id: 2, title: "Recipe 2" },
    ];
    Recipe.findAll.mockResolvedValue(mockRecipes);

    const response = await request(app).get("/api/recipes");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockRecipes);
    expect(Recipe.findAll).toHaveBeenCalled();
  });

  // Test: Get recipe by ID
  it("GET /api/recipes/:id - should fetch a recipe by ID", async () => {
    const mockRecipe = { id: 1, title: "Recipe 1" };
    Recipe.findByPk.mockResolvedValue(mockRecipe);

    const response = await request(app).get("/api/recipes/1");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockRecipe);
    expect(Recipe.findByPk).toHaveBeenCalledWith("1");
  });

  it("GET /api/recipes/:id - should return 404 if recipe not found", async () => {
    Recipe.findByPk.mockResolvedValue(null);

    const response = await request(app).get("/api/recipes/99");

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: "Recipe not found" });
  });

  // Test: Create a new recipe
  it("POST /api/recipes/create - should create a new recipe", async () => {
    const mockRecipe = { id: 1, title: "New Recipe" };
    Recipe.create.mockResolvedValue(mockRecipe);

    const response = await request(app)
      .post("/api/recipes/create")
      .field("title", "New Recipe")
      .field("description", "Test description")
      .field("ingredients", "Test ingredients")
      .field("instructions", "Test instructions");

    expect(response.status).toBe(201);
    expect(response.body).toEqual(mockRecipe);
    expect(Recipe.create).toHaveBeenCalledWith({
      title: "New Recipe",
      description: "Test description",
      ingredients: "Test ingredients",
      instructions: "Test instructions",
      image: null,
    });
  });

  // Test: Update a recipe
  it("PUT /api/recipes/:id - should update a recipe", async () => {
    const mockRecipe = { update: jest.fn() };
    Recipe.findByPk.mockResolvedValue(mockRecipe);

    const response = await request(app)
      .put("/api/recipes/1")
      .send({ title: "Updated Recipe" });

    expect(mockRecipe.update).toHaveBeenCalledWith({
      title: "Updated Recipe",
      description: undefined,
      ingredients: undefined,
      instructions: undefined,
      image: null,
    });
    expect(response.status).toBe(200);
  });

  it("PUT /api/recipes/:id - should return 404 if recipe not found", async () => {
    Recipe.findByPk.mockResolvedValue(null);

    const response = await request(app)
      .put("/api/recipes/99")
      .send({ title: "Updated Recipe" });

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: "Recipe not found" });
  });

  // Test: Delete a recipe
  it("DELETE /api/recipes/:id - should delete a recipe", async () => {
    const mockRecipe = { destroy: jest.fn() };
    Recipe.findByPk.mockResolvedValue(mockRecipe);

    const response = await request(app).delete("/api/recipes/1");

    expect(mockRecipe.destroy).toHaveBeenCalled();
    expect(response.status).toBe(204);
  });

  it("DELETE /api/recipes/:id - should return 404 if recipe not found", async () => {
    Recipe.findByPk.mockResolvedValue(null);

    const response = await request(app).delete("/api/recipes/99");

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: "Recipe not found" });
  });
});
