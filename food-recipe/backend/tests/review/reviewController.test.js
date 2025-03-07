import Review from "../models/Review.js";

// Get all reviews
export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll();
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get review by ID
export const getReviewById = async (req, res) => {
  try {
    const review = await Review.findByPk(req.params.id);
    if (review) {
      res.json(review);
    } else {
      res.status(404).json({ message: "Review not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new review
export const createReview = async (req, res) => {
  try {
    const { userId, description } = req.body;
    const newReview = await Review.create({ userId, description });
    res.status(201).json(newReview);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a review
export const updateReview = async (req, res) => {
  try {
    const review = await Review.findByPk(req.params.id);
    if (review) {
      const { userId, description } = req.body;
      await review.update({ userId, description });
      res.json(review);
    } else {
      res.status(404).json({ message: "Review not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a review
export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findByPk(req.params.id);
    if (review) {
      await review.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Review not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};