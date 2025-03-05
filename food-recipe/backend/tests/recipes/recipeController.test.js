import { jest } from "@jest/globals";
import Recipe from "../models/Recipe.js";
import { getAllRecipes, getRecipeById, createRecipe, updateRecipe, deleteRecipe } from "../controllers/recipeController.js";

// Mock Sequelize Methods
jest.mock("../models/Recipe", () => ({
  findAll: jest.fn(),
  findByPk: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  destroy: jest.fn(),
}));

describe("Recipe Controller", () => {
  afterEach(() => {
    jest.clearAllMocks();  // Clear mock history between tests
  });

  // Test Get All Recipes
  it("should fetch all recipes", async () => {
    const mockRecipes = [
      { id: 1, title: "Recipe 1" },
      { id: 2, title: "Recipe 2" },
    ];
    Recipe.findAll.mockResolvedValue(mockRecipes);

    const req = {};
    const res = { json: jest.fn() };

    await getAllRecipes(req, res);

    expect(Recipe.findAll).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(mockRecipes);
  });

  // Test Get Recipe by ID
  it("should fetch a recipe by ID", async () => {
    const mockRecipe = { id: 1, title: "Recipe 1" };
    Recipe.findByPk.mockResolvedValue(mockRecipe);

    const req = { params: { id: 1 } };
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

    await getRecipeById(req, res);

    expect(Recipe.findByPk).toHaveBeenCalledWith(1);
    expect(res.json).toHaveBeenCalledWith(mockRecipe);
  });

  // Test Create Recipe
  it("should create a new recipe", async () => {
    const mockRecipe = { id: 1, title: "New Recipe" };
    Recipe.create.mockResolvedValue(mockRecipe);

    const req = { body: { title: "New Recipe", description: "Test" }, file: { path: "image.jpg" } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await createRecipe(req, res);

    expect(Recipe.create).toHaveBeenCalledWith({
      title: "New Recipe",
      description: "Test",
      ingredients: undefined,
      instructions: undefined,
      image: "image.jpg",
    });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockRecipe);
  });

  // Test Update Recipe
  it("should update a recipe", async () => {
    const mockRecipe = { update: jest.fn() };
    Recipe.findByPk.mockResolvedValue(mockRecipe);

    const req = { params: { id: 1 }, body: { title: "Updated Recipe" }, file: { path: "updated.jpg" } };
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

    await updateRecipe(req, res);

    expect(mockRecipe.update).toHaveBeenCalledWith({
      title: "Updated Recipe",
      description: undefined,
      ingredients: undefined,
      instructions: undefined,
      image: "updated.jpg",
    });
    expect(res.json).toHaveBeenCalledWith(mockRecipe);
  });

  // Test Delete Recipe
  it("should delete a recipe", async () => {
    const mockRecipe = { destroy: jest.fn() };
    Recipe.findByPk.mockResolvedValue(mockRecipe);

    const req = { params: { id: 1 } };
    const res = { send: jest.fn(), status: jest.fn().mockReturnThis() };

    await deleteRecipe(req, res);

    expect(mockRecipe.destroy).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
  });
});
