import express from 'express';
import { getAllReviews, getReviewById, createReview, updateReview, deleteReview } from '../controllers/ReviewController.js';

const router = express.Router();

// Create a new review
router.post('/', createReview);

// Get all reviews
router.get('/', getAllReviews);

// Get a single review by ID
router.get('/:id', getReviewById);

// Update a review by ID
router.put('/:id', updateReview);

// Delete a review by ID
router.delete('/:id', deleteReview);

export default router;