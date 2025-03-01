import express from "express";
import {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
} from "../controllers/recipeController.js";
import multer from "multer";
import path from "path";

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "recipe_images/"); // Save images in the 'recipe_images' folder
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    ); // Generate unique filenames
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error("Only images (jpeg, jpg, png, gif) are allowed!"));
    }
  },
});

const router = express.Router();

// Get all recipes
router.get("/", getAllRecipes);

// Get a single recipe by ID
router.get("/:id", getRecipeById);

// Create a new recipe with image upload
router.post("/create", upload.single("image"), createRecipe);

// Update a recipe with image upload
router.put("/:id", upload.single("image"), updateRecipe);

// Delete a recipe by ID
router.delete("/:id", deleteRecipe);

export default router;