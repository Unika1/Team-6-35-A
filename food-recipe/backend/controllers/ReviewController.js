import Review from '../models/Review.js';

// Create a new review
export const createReview = async (req, res) => {
  try {
    const { Description, userId } = req.body;

    // Validate that Description and userId are provided
    if (!Description || !userId) {
      return res.status(400).json({ error: 'Description and userId are required' });
    }

    const review = await Review.create({ Description, userId });
    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all reviews
export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single review by ID
export const getReviewById = async (req, res) => {
  try {
    const review = await Review.findByPk(req.params.id);
    if (review) {
      res.status(200).json(review);
    } else {
      res.status(404).json({ error: 'Review not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a review by ID
export const updateReview = async (req, res) => {
  try {
    const { Description } = req.body;
    const review = await Review.findByPk(req.params.id);
    if (review) {
      review.Description = Description;
      await review.save();
      res.status(200).json(review);
    } else {
      res.status(404).json({ error: 'Review not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a review by ID
export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findByPk(req.params.id);
    if (review) {
      await review.destroy();
      res.status(204).json({ message: 'Review deleted' });
    } else {
      res.status(404).json({ error: 'Review not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};