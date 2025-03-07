// filepath: /c:/Users/Acer/Desktop/Group- project/food-recipe/backend/tests/review/security.test.js
import request from "supertest";
import express from "express";
import reviewRouter from "../../routes/reviewRoute.js";
import { sequelize } from "../../config/db.js"; // Adjust the path as needed

const app = express();
app.use(express.json());
app.use("/api", reviewRouter);

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

describe("Security Tests", () => {
  // 🛡️ Test: Prevent SQL Injection
  it("should prevent SQL Injection", async () => {
    const res = await request(app)
      .post("/api/reviews")
      .send({
        userId: 1,
        description: "' OR 1=1 --",
      });
    expect(res.status).toBe(400);  // Assuming your validation returns 400 for invalid inputs
    expect(res.body.message).toBe("Invalid input data");  // Customize based on your error response
  });

  // 🛡️ Test: Prevent XSS Attacks
  it("should prevent XSS attacks", async () => {
    const res = await request(app)
      .post("/api/reviews")
      .send({
        userId: 1,
        description: "<script>alert('XSS')</script>",
      });
    expect(res.status).toBe(400);  // Assuming your validation returns 400 for invalid inputs
    expect(res.body.message).toBe("Invalid input data");  // Customize based on your error response
  });

  // 🛡️ Test: Handle Unknown Routes
  it("should return 404 for unknown routes", async () => {
    const res = await request(app).get("/api/unknown");
    expect(res.status).toBe(404);
    expect(res.body.message).toBe("Not Found");  // Customize based on your error response
  });
});