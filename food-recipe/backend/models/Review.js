import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js'; // Adjust the path as needed

const Review = sequelize.define('Review', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'User', // Adjust the model name as needed
            key: 'id'
        }
    },
    Description: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true
});

export default Review;