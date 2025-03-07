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

export default Review;import SequelizeMock from "sequelize-mock";
const dbMock = new SequelizeMock();

const ReviewMock = dbMock.define("Review", {
  userId: 1,
  description: "This is a test review",
}, {
  timestamps: true,
});

describe("Review Model", () => {
  it("should create a review", async () => {
    const review = await ReviewMock.create({
      userId: 1,
      description: "This is a test review",
    });

    expect(review.userId).toBe(1);
    expect(review.description).toBe("This is a test review");
  });

  it("should require a userId and description", async () => {
    await expect(ReviewMock.create({})).rejects.toThrow();
  });
});