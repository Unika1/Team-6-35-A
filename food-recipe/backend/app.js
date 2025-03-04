import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { sequelize, connection } from "./config/db.js"; 
import recipeRoutes from "./routes/recipeRoute.js";
import userRoutes from "./routes/userRoute.js";
import path from "path"; 

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'], // Allow both frontend URLs
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

const __dirname = path.resolve(); 
app.use("/recipe_images", express.static(path.join(__dirname, "recipe_images")));

// Routes
app.use("/api/recipes", recipeRoutes); 
app.use("/api/users", userRoutes);

sequelize
  .sync({ force: false }) 
  .then(() => console.log("Database Synced!"))
  .catch((err) => console.error("Error syncing database:", err));

connection();

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Start the server on port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
