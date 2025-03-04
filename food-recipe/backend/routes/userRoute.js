import express from "express";
import { signupUser, loginUser, getUserById, updateUser, deleteUser } from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.get("/:id", authMiddleware.verifyToken, getUserById);
router.put("/:id", authMiddleware.verifyToken, updateUser);
router.delete("/:id", authMiddleware.verifyToken, deleteUser);

export default router;
