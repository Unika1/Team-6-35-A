import SequelizeMock from "sequelize-mock";

const dbMock = new SequelizeMock();

const RecipeMock = dbMock.define("Recipe", {
  id: 1,
  title: "Test Recipe",
  description: "This is a test recipe",
  ingredients: "Test ingredients",
  instructions: "Test instructions",
  image: "test.jpg",
});

describe("Recipe Model", () => {
  it("should create a new recipe", async () => {
    const recipe = await RecipeMock.create({
      title: "New Recipe",
      description: "A new test recipe",
      ingredients: "New ingredients",
      instructions: "New instructions",
      image: "new.jpg",
    });

    expect(recipe.title).toBe("New Recipe");
    expect(recipe.description).toBe("A new test recipe");
    expect(recipe.ingredients).toBe("New ingredients");
    expect(recipe.instructions).toBe("New instructions");
    expect(recipe.image).toBe("new.jpg");
  });

  it("should update a recipe", async () => {
    const recipe = await RecipeMock.create({
      title: "New Recipe",
      description: "A new test recipe",
      ingredients: "New ingredients",
      instructions: "New instructions",
      image: "new.jpg",
    });

    await recipe.update({
      title: "Updated Recipe",
      description: "An updated test recipe",
    });

    expect(recipe.title).toBe("Updated Recipe");
    expect(recipe.description).toBe("An updated test recipe");
  });

  it("should delete a recipe", async () => {
    const recipe = await RecipeMock.create({
      title: "New Recipe",
      description: "A new test recipe",
      ingredients: "New ingredients",
      instructions: "New instructions",
      image: "new.jpg",
    });

    await recipe.destroy();

    const foundRecipe = await RecipeMock.findByPk(recipe.id);
    expect(foundRecipe).toBeNull();
  });

  it("should require a title and description", async () => {
    await expect(RecipeMock.create({})).rejects.toThrow();
  });
});