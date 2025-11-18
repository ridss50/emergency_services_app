import request from "supertest";
import express from "express";
import { AmbulanceController } from "../controllers/ambulanceController";
import { db } from "../utils/database";

// Mock the database
jest.mock("../utils/database", () => ({
  db: {
    query: jest.fn(),
    run: jest.fn(),
  },
}));

const app = express();
app.use(express.json());
const ambulanceController = new AmbulanceController();

// Mount routes for testing
app.get("/api/ambulances", (req, res) =>
  ambulanceController.getAllAmbulances(req, res)
);
app.post("/api/ambulances", (req, res) =>
  ambulanceController.createAmbulance(req, res)
);
app.get("/api/ambulances/:id", (req, res) =>
  ambulanceController.getAmbulanceById(req, res)
);
app.put("/api/ambulances/:id", (req, res) =>
  ambulanceController.updateAmbulance(req, res)
);
app.delete("/api/ambulances/:id", (req, res) =>
  ambulanceController.deleteAmbulance(req, res)
);
app.get("/api/ambulances/count", (req, res) =>
  ambulanceController.getAmbulanceCount(req, res)
);

describe("Ambulance Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /api/ambulances", () => {
    it("should return all ambulances with pagination", async () => {
      const mockAmbulances = [
        {
          id: "1",
          title: "Ambulance 1",
          location: "Location 1",
          contactNumber: "123",
          isAvailable: true,
        },
        {
          id: "2",
          title: "Ambulance 2",
          location: "Location 2",
          contactNumber: "456",
          isAvailable: false,
        },
      ];

      (db.query as jest.Mock)
        .mockResolvedValueOnce(mockAmbulances) // For ambulances query
        .mockResolvedValueOnce([{ count: 2 }]); // For count query

      const response = await request(app)
        .get("/api/ambulances")
        .query({ page: 1, limit: 10 })
        .expect(200);

      expect(response.body).toEqual({
        data: mockAmbulances,
        total: 2,
        page: 1,
        limit: 10,
        totalPages: 1,
      });
    });

    it("should handle errors when fetching ambulances", async () => {
      (db.query as jest.Mock).mockRejectedValue(new Error("Database error"));

      const response = await request(app).get("/api/ambulances").expect(500);

      expect(response.body).toEqual({ error: "Failed to fetch ambulances" });
    });
  });

  describe("GET /api/ambulances/:id", () => {
    it("should return a specific ambulance", async () => {
      const mockAmbulance = {
        id: "1",
        title: "Test Ambulance",
        description: "Test Description",
        location: "Test Location",
        contactNumber: "1234567890",
        isAvailable: true,
      };

      (db.query as jest.Mock).mockResolvedValue([mockAmbulance]);

      const response = await request(app).get("/api/ambulances/1").expect(200);

      expect(response.body).toEqual(mockAmbulance);
    });

    it("should return 404 when ambulance not found", async () => {
      (db.query as jest.Mock).mockResolvedValue([]);

      const response = await request(app)
        .get("/api/ambulances/999")
        .expect(404);

      expect(response.body).toEqual({ error: "Ambulance not found" });
    });
  });

  describe("POST /api/ambulances", () => {
    it("should create a new ambulance", async () => {
      const newAmbulance = {
        title: "New Ambulance",
        description: "New Description",
        location: "New Location",
        contactNumber: "1234567890",
        latitude: 40.7128,
        longitude: -74.006,
      };

      const mockAmbulance = { id: "123", ...newAmbulance, isAvailable: true };

      (db.run as jest.Mock).mockResolvedValue({ id: "123" });
      (db.query as jest.Mock).mockResolvedValue([mockAmbulance]);

      const response = await request(app)
        .post("/api/ambulances")
        .send(newAmbulance)
        .expect(201);

      expect(response.body).toEqual(mockAmbulance);
    });

    it("should handle creation errors", async () => {
      (db.run as jest.Mock).mockRejectedValue(new Error("Database error"));

      const response = await request(app)
        .post("/api/ambulances")
        .send({ title: "Test" })
        .expect(500);

      expect(response.body).toEqual({ error: "Failed to create ambulance" });
    });
  });

  describe("DELETE /api/ambulances/:id", () => {
    it("should delete an ambulance", async () => {
      (db.run as jest.Mock).mockResolvedValue(undefined);

      await request(app).delete("/api/ambulances/1").expect(204);
    });

    it("should handle deletion errors", async () => {
      (db.run as jest.Mock).mockRejectedValue(new Error("Database error"));

      const response = await request(app)
        .delete("/api/ambulances/1")
        .expect(500);

      expect(response.body).toEqual({ error: "Failed to delete ambulance" });
    });
  });
});
