import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../../styles/Recipe.css";

const Recipe = () => {
    const [item, setItem] = useState(null);
    const { recipeId } = useParams();

    useEffect(() => {
        if (recipeId) {
            fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`)
                .then(res => res.json())
                .then(data => {
                    setItem(data.meals[0]);
                });
        }
    }, [recipeId]);

    if (!item) {
        return <div>Loading...</div>;
    }

    const youtubeId = item.strYoutube.split("=")[1];

    return (
        <div className="recipe-container">
            <div className="recipe-header">
                <img src={item.strMealThumb} alt={item.strMeal} className="recipe-image" />
                <div className="recipe-title">
                    <h1>{item.strMeal}</h1>
                    <h2>{item.strArea} Food | {item.strCategory}</h2>
                </div>
            </div>

            <div className="recipe-content">
                <div className="ingredients">
                    <h2>Ingredients</h2>
                    <ul>
                        {[...Array(20)].map((_, i) => {
                            const ingredient = item[`strIngredient${i + 1}`];
                            const measure = item[`strMeasure${i + 1}`];
                            return ingredient ? (
                                <li key={i}>
                                    {ingredient}: {measure}
                                </li>
                            ) : null;
                        })}
                    </ul>
                </div>

                <div className="instructions">
                    <h2>Instructions</h2>
                    <p>{item.strInstructions}</p>
                </div>
            </div>

            <div className="video-container">
                <iframe
                    width="100%"
                    height="500"
                    src={`https://www.youtube.com/embed/${youtubeId}`}
                    title="Recipe Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>
        </div>
    );
};

export default Recipe;