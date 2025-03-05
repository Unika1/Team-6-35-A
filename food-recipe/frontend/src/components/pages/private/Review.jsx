import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Review = () => {
  const [reviews, setReviews] = useState([]);
  const [Description, setDescription] = useState('');
  const [editId, setEditId] = useState(null);

  const userId = 1; // Update this based on actual user

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/reviews');
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const review = { Description, userId };

    console.log('Submitting review:', review);

    try {
      if (editId) {
        await axios.put(`http://localhost:5000/api/reviews/${editId}`, review);
        setEditId(null);
      } else {
        await axios.post('http://localhost:5000/api/reviews', review);
      }
      setDescription('');
      fetchReviews();
    } catch (error) {
      console.error('Error submitting review:', error.response ? error.response.data : error.message);
    }
  };

  const handleEdit = (review) => {
    setDescription(review.Description);
    setEditId(review.id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/reviews/${id}`);
      fetchReviews();
    } catch (error) {
      console.error('Error deleting review:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div>
      <h1>Reviews</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Write your review..."
          value={Description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button className='btn' type="submit">{editId ? 'Update' : 'Add'} Review</button>
      </form>

      <ul>
        {Array.isArray(reviews) && reviews.map((review) => (
          <li key={review.id} className="review-item">
            <p>{review.Description}</p>
            <button className='edit' onClick={() => handleEdit(review)}>Edit</button>
            <button className='delete' onClick={() => handleDelete(review.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <style jsx>{`
        div {
          font-family: Arial, sans-serif;
          padding: 20px;
        }

        h1 {
          text-align: center;
        }

        form {
          display: flex;
          flex-direction: column;
          margin-bottom: 20px;
        }

        textarea {
          padding: 15px; /* Increased padding for larger text area */
          margin-bottom: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
          min-height: 150px; /* Increased height */
          width: 100%; /* Ensure it takes the full width of the container */
          max-width: 600px; /* Set a max width for better control */
          font-size: 16px; /* Larger font size for placeholder and content */
        }

        button {
          padding: 4px 8px; /* Smaller padding */
          font-size: 12px; /* Smaller font size */
          width: 120px; /* Set a fixed width for the button */
          background-color: #4CAF50;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          margin-bottom: 10px;
          display: inline-block; /* Prevent stretching */
          text-align: center; /* Center the text inside the button */
        }

        button:hover {
          background-color: #45a049;
        }

        .review-item {
          padding: 10px;
          border: 1px solid #ddd;
          margin-bottom: 10px;
          border-radius: 4px;
        }

        .edit, .delete {
          padding: 4px 8px; /* Smaller padding */
          font-size: 12px; /* Smaller font size */
          margin-right: 5px;
          border: none;
          cursor: pointer;
          border-radius: 4px;
          display: inline-block; /* Prevent stretching */
        }

        .edit {
          background-color: #ffa500;
        }

        .delete {
          background-color: #f44336;
        }

        .edit:hover {
          background-color: #e68a00;
        }

        .delete:hover {
          background-color: #e60000;
        }
      `}</style>
    </div>
  );
};

export default Review;
