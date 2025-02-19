import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/MealItem.css";

const MealItem = ({ data }) => {
  let navigate = useNavigate(); // Initialize useNavigate hook

  return (
    <>
      {data ? (
        data.map((item) => (
          <div
            className="card"
            key={item.idMeal}
            onClick={() => navigate(`/${item.idMeal}`)} // Correct use of navigate
          >
            <img src={item.strMealThumb} alt={item.strMeal} />
            <h3>{item.strMeal}</h3>
          </div>
        ))
      ) : (
        <p>Not Found</p>
      )}
    </>
  );
};

export default MealItem;
