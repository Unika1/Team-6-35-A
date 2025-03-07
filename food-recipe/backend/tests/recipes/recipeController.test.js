import { jest } from "@jest/globals";
import Recipe from "../../models/recipe.js";
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
  const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    return res;
  };

  let req, res;

  beforeEach(() => {
    req = { params: {}, body: {}, file: {} };
    res = mockResponse();
  });

  afterEach(() => {
    jest.clearAllMocks();  // Clear mock history between tests
  });

  // Test Get All Recipes
  it("should fetch all recipes", async () => {
    Recipe.findAll.mockResolvedValue([{ id: 1, title: "Recipe 1" }]);
    await getAllRecipes(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([{ id: 1, title: "Recipe 1" }]);
  });

  // Test Get Recipe by ID
  it("should fetch a recipe by ID", async () => {
    req.params.id = 1;
    Recipe.findByPk.mockResolvedValue({ id: 1, title: "Recipe 1" });
    await getRecipeById(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ id: 1, title: "Recipe 1" });
  });

  it("should return 404 if recipe not found", async () => {
    req.params.id = 1;
    Recipe.findByPk.mockResolvedValue(null);
    await getRecipeById(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Recipe not found" });
  });

  // Test Create Recipe
  it("should create a new recipe", async () => {
    req.body = {
      title: "New Recipe",
      description: "Test",
      ingredients: "Test ingredients",
      instructions: "Test instructions",
    };
    req.file = { path: "image.jpg" };
    Recipe.create.mockResolvedValue(req.body);
    await createRecipe(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(req.body);
  });

  // Test Update Recipe
  it("should update a recipe", async () => {
    req.params.id = 1;
    req.body = {
      title: "Updated Recipe",
      description: "An updated test recipe",
      ingredients: "Updated ingredients",
      instructions: "Updated instructions",
    };
    req.file = { path: "updated.jpg" };
    Recipe.findByPk.mockResolvedValue({
      update: jest.fn().mockResolvedValue(req.body)
    });
    await updateRecipe(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(req.body);
  });

  // Test Delete Recipe
  it("should delete a recipe", async () => {
    req.params.id = 1;
    Recipe.findByPk.mockResolvedValue({
      destroy: jest.fn().mockResolvedValue({})
    });
    await deleteRecipe(req, res);
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
  });

  it("should return 404 if recipe to delete not found", async () => {
    req.params.id = 1;
    Recipe.findByPk.mockResolvedValue(null);
    await deleteRecipe(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Recipe not found" });
  });
});