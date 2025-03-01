import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { sequelize, connection } from "./config/db.js"; // Named import
import recipeRoutes from "./routes/recipeRoute.js";
import path from "path"; // Import path module for handling file paths

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the 'recipe_images' folder
const __dirname = path.resolve(); // Get the current directory
app.use("/recipe_images", express.static(path.join(__dirname, "recipe_images")));

// Routes
app.use("/api/recipes", recipeRoutes); // Handle recipe-related requests

// Sync Database (Creates tables if they don’t exist)
sequelize
  .sync()
  .then(() => console.log("Database Synced!"))
  .catch((err) => console.error("Error syncing database:", err));

// Test database connection
connection();

// Start the server
const PORT = process.env.PORT || 5000; // Use environment variable for port
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));