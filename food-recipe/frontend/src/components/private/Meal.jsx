import React from "react";
import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import MealItem from "./MealItem";
import RecipeIndex from "./RecipeIndex";
import "../../styles/Meal.css";

const Meal = () => {
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);
  const [item, setItem] = useState("");
  const [url, setUrl] = useState("https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef");

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setItem(data.meals);
        setShow(true);
      });
  }, [url]);

  const searchRecipe = (evt) => {
    if (evt.key === "Enter" || evt.type === "click") {
      setUrl(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`);
    }
  };

  const setCategory = (category) => {
    setUrl(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
  };

  return (
    <>
      <div className="meal-main">
        {/* Search Bar */}
        <div className="searchBox">
          <div className="searchbar">
            <input
              type="search"
              className="searchinput"
              placeholder="Search recipes..."
              onChange={(e) => setSearch(e.target.value)}
              onKeyPress={searchRecipe}
            />
            <div className="searchicon" onClick={searchRecipe}>
              <FaSearch />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="meal-layout">
          {/* Categories Section (Left Side) */}
          <div className="indexContainer">
            <h2>Categories</h2>
            <RecipeIndex categoryIndex={(category) => setCategory(category)} />
          </div>

          {/* Meal Content (Middle) */}
          <div className="meal-container">
            {show ? <MealItem data={item} /> : "Not Found"}
          </div>
        </div>
      </div>
    </>
  );
};

export default Meal;