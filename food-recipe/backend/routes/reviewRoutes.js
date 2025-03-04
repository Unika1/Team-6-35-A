Route
import express from 'express';
import Review from '../models/Review.js';

const router = express.Router();

// Create a new review
router.post('/', async (req, res) => {
    try {
        const {  rating, comment } = req.body;
        const newReview = await Review.create({
             rating, comment });
        res.status(201).json(newReview);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all reviews
router.get('/', async (req, res) => {
    try {
        const reviews = await Review.findAll();
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a single review by ID
router.get('/:id', async (req, res) => {
    try {
        const review = await Review.findByPk(req.params.id);
        if (!review) return res.status(404).json({ message: 'Review not found' });
        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a review by ID
router.put('/:id', async (req, res) => {
    try {
        const { rating, comment } = req.body;
        const [updated] = await Review.update({ rating, comment }, {
            where: { id: req.params.id }
        });
        if (!updated) return res.status(404).json({ message: 'Review not found' });
        const updatedReview = await Review.findByPk(req.params.id);
        res.status(200).json(updatedReview);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a review by ID
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Review.destroy({
            where: { id: req.params.id }
        });
        if (!deleted) return res.status(404).json({ message: 'Review not found' });
        res.status(200).json({ message: 'Review deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;