import request from "supertest";
import express from "express";
import recipeRouter from "../../routes/recipeRoute.js";
import Recipe from "../../models/Recipe.js";

jest.mock("../../models/Recipe", () => ({
  findByPk: jest.fn(),
  findAll: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  destroy: jest.fn(),
}));

const app = express();
app.use(express.json());
app.use("/api/recipes", recipeRouter);

describe("Recipe Routes", () => {
  let server;

  beforeAll(() => {
    server = app.listen(4000);
  });

  afterAll((done) => {
    server.close(done);
  });

  test("GET /api/recipes should fetch all recipes", async () => {
    Recipe.findAll.mockResolvedValue([{ id: 1, title: "Recipe 1" }]);
    const response = await request(app).get("/api/recipes");
    expect(response.status).toBe(200);
    expect(response.body).toEqual([{ id: 1, title: "Recipe 1" }]);
  });

  test("GET /api/recipes/:id should fetch a recipe by ID", async () => {
    Recipe.findByPk.mockResolvedValue({ id: 1, title: "Recipe 1" });
    const response = await request(app).get("/api/recipes/1");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ id: 1, title: "Recipe 1" });
  });

  test("GET /api/recipes/:id should return 404 if recipe not found", async () => {
    Recipe.findByPk.mockResolvedValue(null);
    const response = await request(app).get("/api/recipes/1");
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: "Recipe not found" });
  });

  test("POST /api/recipes should create a new recipe", async () => {
    const newRecipe = {
      title: "New Recipe",
      description: "Test",
      ingredients: "Test ingredients",
      instructions: "Test instructions",
      image: "new.jpg",
    };
    Recipe.create.mockResolvedValue(newRecipe);
    const response = await request(app).post("/api/recipes").send(newRecipe);
    expect(response.status).toBe(201);
    expect(response.body).toEqual(newRecipe);
  });

  test("PUT /api/recipes/:id should update a recipe", async () => {
    const updatedRecipe = {
      title: "Updated Recipe",
      description: "An updated test recipe",
      ingredients: "Updated ingredients",
      instructions: "Updated instructions",
      image: "updated.jpg",
    };
    Recipe.findByPk.mockResolvedValue({
      update: jest.fn().mockResolvedValue(updatedRecipe),
    });
    const response = await request(app).put("/api/recipes/1").send(updatedRecipe);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(updatedRecipe);
  });

  test("DELETE /api/recipes/:id should delete a recipe", async () => {
    Recipe.findByPk.mockResolvedValue({
      destroy: jest.fn().mockResolvedValue({}),
    });
    const response = await request(app).delete("/api/recipes/1");
    expect(response.status).toBe(204);
  });

  test("DELETE /api/recipes/:id should return 404 if recipe to delete not found", async () => {
    Recipe.findByPk.mockResolvedValue(null);
    const response = await request(app).delete("/api/recipes/1");
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: "Recipe not found" });
  });
});