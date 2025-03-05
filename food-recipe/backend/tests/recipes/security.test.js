const request = require("supertest");
const app = require("../server");  // Make sure this path is correct

describe("Security Tests", () => {

  // 🛡️ Test: Prevent SQL Injection
  it("should prevent SQL Injection", async () => {
    const res = await request(app)
      .post("/api/products/create_product")
      .send({
        productName: "' OR 1=1 --",
        price: 99.99,
        description: "Hacked"
      });
    expect(res.status).toBe(400);  // Assuming your validation returns 400 for invalid inputs
    expect(res.body.message).toBe("Invalid input data");  // Customize based on your error response
  });

  // 🛡️ Test: Prevent XSS Attacks
  it("should prevent XSS attacks", async () => {
    const res = await request(app)
      .post("/api/products/create_product")
      .send({
        productName: "<script>alert('XSS')</script>",
        price: 99.99,
        description: "XSS Test"
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
