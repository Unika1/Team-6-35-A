import request from "supertest";
import express from "express";
import reviewRouter from "../../routes/reviewRoute.js";
import Review from "../../models/Review.js";

jest.mock("../../models/Review", () => ({
  findByPk: jest.fn(),
  findAll: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  destroy: jest.fn(),
}));

const app = express();
app.use(express.json());
app.use("/api/reviews", reviewRouter);

describe("Review Routes", () => {
  let server;

  beforeAll(() => {
    server = app.listen(4000);
  });

  afterAll((done) => {
    server.close(done);
  });

  test("GET /api/reviews should fetch all reviews", async () => {
    Review.findAll.mockResolvedValue([{ id: 1, description: "Review 1" }]);
    const response = await request(app).get("/api/reviews");
    expect(response.status).toBe(200);
    expect(response.body).toEqual([{ id: 1, description: "Review 1" }]);
  });

  test("GET /api/reviews/:id should fetch a review by ID", async () => {
    Review.findByPk.mockResolvedValue({ id: 1, description: "Review 1" });
    const response = await request(app).get("/api/reviews/1");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ id: 1, description: "Review 1" });
  });

  test("GET /api/reviews/:id should return 404 if review not found", async () => {
    Review.findByPk.mockResolvedValue(null);
    const response = await request(app).get("/api/reviews/1");
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: "Review not found" });
  });

  test("POST /api/reviews should create a new review", async () => {
    const newReview = {
      userId: 1,
      description: "New Review",
    };
    Review.create.mockResolvedValue(newReview);
    const response = await request(app).post("/api/reviews").send(newReview);
    expect(response.status).toBe(201);
    expect(response.body).toEqual(newReview);
  });

  test("PUT /api/reviews/:id should update a review", async () => {
    const updatedReview = {
      userId: 1,
      description: "Updated Review",
    };
    Review.findByPk.mockResolvedValue({
      update: jest.fn().mockResolvedValue(updatedReview),
    });
    const response = await request(app).put("/api/reviews/1").send(updatedReview);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(updatedReview);
  });

  test("DELETE /api/reviews/:id should delete a review", async () => {
    Review.findByPk.mockResolvedValue({
      destroy: jest.fn().mockResolvedValue({}),
    });
    const response = await request(app).delete("/api/reviews/1");
    expect(response.status).toBe(204);
  });

  test("DELETE /api/reviews/:id should return 404 if review to delete not found", async () => {
    Review.findByPk.mockResolvedValue(null);
    const response = await request(app).delete("/api/reviews/1");
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: "Review not found" });
  });
});