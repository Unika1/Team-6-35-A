import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js'; // Adjust the path as needed

const Review = sequelize.define('Review', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users', // Adjust the model name as needed
            key: 'id'
        }
    },
    recipeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Recipes', // Adjust the model name as needed
            key: 'id'
        }
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 5
        }
    },
    comment: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true
});

export default Review;