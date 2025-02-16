import React from "react";
import "../../styles/RecipeIndex.css";

const RecipeIndex = ({ categoryIndex }) => {
    const categories = [
      "Starter", "Breakfast", "Chicken", "Vegetarian", "Seafood", "Vegan", "Side", "Dessert"
    ];
  
    return (
      <>
        {categories.map((category, index) => (
          <div className="numBox" key={index} onClick={() => categoryIndex(category)}>
            <h3>{category}</h3>
          </div>
        ))}
      </>
    );
  };
  

export default RecipeIndex;