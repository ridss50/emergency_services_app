import request from "supertest";
import express from "express";
import { DoctorController } from "../controllers/doctorController";
import { db } from "../utils/database";

jest.mock("../utils/database", () => ({
  db: {
    query: jest.fn(),
    run: jest.fn(),
  },
}));

const app = express();
app.use(express.json());
const doctorController = new DoctorController();

app.get("/api/doctors", (req, res) => doctorController.getAllDoctors(req, res));
app.post("/api/doctors", (req, res) => doctorController.createDoctor(req, res));

describe("Doctor Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /api/doctors", () => {
    it("should return all doctors with pagination", async () => {
      const mockDoctors = [
        {
          id: "1",
          title: "Dr. John Doe",
          specialization: "Cardiology",
          experience: 10,
          location: "Hospital A",
          contactNumber: "1234567890",
          isAvailable: true,
        },
      ];

      (db.query as jest.Mock)
        .mockResolvedValueOnce(mockDoctors)
        .mockResolvedValueOnce([{ count: 1 }]);

      const response = await request(app)
        .get("/api/doctors")
        .query({ page: 1, limit: 10 })
        .expect(200);

      expect(response.body).toEqual({
        data: mockDoctors,
        total: 1,
        page: 1,
        limit: 10,
        totalPages: 1,
      });
    });
  });

  describe("POST /api/doctors", () => {
    it("should create a new doctor", async () => {
      const newDoctor = {
        title: "Dr. Jane Smith",
        description: "Experienced cardiologist",
        location: "City Hospital",
        specialization: "Cardiology",
        contactNumber: "0987654321",
        experience: 8,
        latitude: 40.7128,
        longitude: -74.006,
      };

      const mockDoctor = { id: "123", ...newDoctor, isAvailable: true };

      (db.run as jest.Mock).mockResolvedValue({ id: "123" });
      (db.query as jest.Mock).mockResolvedValue([mockDoctor]);

      const response = await request(app)
        .post("/api/doctors")
        .send(newDoctor)
        .expect(201);

      expect(response.body).toEqual(mockDoctor);
    });
  });
});
