import jwt from "jsonwebtoken";
import request from "supertest";
import express from "express";
import securityMiddleware from "../../middleware/securityMiddleware.js";

jest.mock("jsonwebtoken", () => ({
  verify: jest.fn(),
}));

const app = express();
app.use(express.json());
app.use(securityMiddleware);

app.get("/protected", (req, res) => {
  res.status(200).json({ message: "Protected route accessed" });
});

describe("Security Middleware", () => {
  it("should allow access with a valid token", async () => {
    jwt.verify.mockImplementation((token, secret, callback) => {
      callback(null, { id: 1, username: "testuser" });
    });

    const response = await request(app)
      .get("/protected")
      .set("Authorization", "Bearer validtoken");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "Protected route accessed" });
  });

  it("should deny access with an invalid token", async () => {
    jwt.verify.mockImplementation((token, secret, callback) => {
      callback(new Error("Invalid token"));
    });

    const response = await request(app)
      .get("/protected")
      .set("Authorization", "Bearer invalidtoken");

    expect(response.status).toBe(403);
    expect(response.body).toEqual({ message: "Invalid or expired token" });
  });

  it("should deny access if no token is provided", async () => {
    const response = await request(app).get("/protected");

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: "Access denied: No token provided" });
  });
});