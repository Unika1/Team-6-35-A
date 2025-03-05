import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../../styles/Review.css';
import Navbar from './Navbar';

const Review = () => {
  const { id: recipeId } = useParams();
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [recipeName, setRecipeName] = useState('');
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: '',
    image: null
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('newest');

  // Fetch recipe details and reviews
  useEffect(() => {
    console.log('Review component mounted, recipeId:', recipeId);
    const fetchRecipeAndReviews = async () => {
      try {
        if (recipeId) {
          // Fetch specific recipe reviews
          const recipeResponse = await fetch(`http://localhost:8080/api/recipes/${recipeId}`);
          const recipeData = await recipeResponse.json();
          setRecipeName(recipeData.title);

          const reviewsResponse = await fetch(`http://localhost:8080/api/recipes/${recipeId}/reviews`);
          const reviewsData = await reviewsResponse.json();
          setReviews(reviewsData);
        } else {
          // Show all reviews
          setRecipeName('All Reviews');
          // You can fetch all reviews here or use dummy data
          setReviews([
            {
              id: 1,
              username: 'John Doe',
              rating: 5,
              comment: 'Great recipe! Loved it.',
              date: new Date().toISOString(),
              image: null
            },
            {
              id: 2,
              username: 'Jane Smith',
              rating: 4,
              comment: 'Very tasty but a bit too spicy for me.',
              date: new Date().toISOString(),
              image: null
            }
          ]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setRecipeName('Reviews');
        setReviews([]); // Empty array instead of undefined
      }
    };

    fetchRecipeAndReviews();
  }, [recipeId]);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/recipes/${recipeId}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newReview,
          username: 'Current User', // This should come from auth context in a real app
        }),
      });

      if (response.ok) {
        const newReviewItem = await response.json();
        setReviews([newReviewItem, ...reviews]);
        setNewReview({ rating: 5, comment: '', image: null });
      } else {
        console.error('Failed to submit review');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      // Fallback for testing
      const newReviewItem = {
        id: reviews.length + 1,
        username: 'Current User',
        ...newReview,
        date: new Date().toISOString()
      };
      setReviews([newReviewItem, ...reviews]);
      setNewReview({ rating: 5, comment: '', image: null });
    }
  };

  const StarRating = ({ rating, onRatingChange }) => {
    return (
      <div className="star-rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`star ${star <= rating ? 'filled' : ''}`}
            onClick={() => onRatingChange && onRatingChange(star)}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <div className="review-container">
        <div className="review-header-section">
          {recipeId && (
            <button
              className="back-button"
              onClick={() => navigate(`/recipe/${recipeId}`)}
            >
              ← Back to Recipe
            </button>
          )}
          <h2>Reviews {recipeName ? `for ${recipeName}` : ''}</h2>
        </div>
        
        {/* Review Form */}
        <form onSubmit={handleSubmitReview} className="review-form">
          <h3>Write a Review</h3>
          <StarRating 
            rating={newReview.rating} 
            onRatingChange={(rating) => setNewReview({...newReview, rating})}
          />
          <textarea
            value={newReview.comment}
            onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
            placeholder="Write your review here..."
            required
          />
          <button type="submit">Submit Review</button>
        </form>

        {/* Sort Controls */}
        <div className="sort-controls">
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="newest">Newest First</option>
            <option value="highest">Highest Rated</option>
            <option value="lowest">Lowest Rated</option>
          </select>
        </div>

        {/* Reviews List */}
        <div className="reviews-list">
          {reviews.map((review) => (
            <div key={review.id} className="review-item">
              <div className="review-header">
                <span className="username">{review.username}</span>
                <StarRating rating={review.rating} />
                <span className="date">
                  {new Date(review.date).toLocaleDateString()}
                </span>
              </div>
              <p className="review-comment">{review.comment}</p>
              {review.image && (
                <img src={review.image} alt="Review" className="review-image" />
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Review;