import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Recipe = sequelize.define(
  "Recipe",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    ingredients: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    instructions: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING, // Store the path to the image file
      allowNull: true, // Allow recipes without images
    },
  },
  {
    tableName: "recipes", // Explicitly set the table name
    timestamps: true, // Enable createdAt and updatedAt fields
  }
);

export default Recipe;