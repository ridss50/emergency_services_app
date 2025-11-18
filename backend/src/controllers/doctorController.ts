import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { db } from "../utils/database";
import { Doctor, PaginationParams, PaginatedResponse } from "../types";

export class DoctorController {
  async getAllDoctors(req: Request, res: Response): Promise<void> {
    try {
      const { page = 1, limit = 10 } = req.query;
      const pageNum = parseInt(page as string);
      const limitNum = parseInt(limit as string);
      const offset = (pageNum - 1) * limitNum;

      const doctors = await db.query(
        "SELECT * FROM doctors ORDER BY createdAt DESC LIMIT ? OFFSET ?",
        [limitNum, offset]
      );

      const totalResult = await db.query(
        "SELECT COUNT(*) as count FROM doctors"
      );
      const total = totalResult[0].count;

      const response: PaginatedResponse<Doctor> = {
        data: doctors,
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum),
      };

      res.json(response);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch doctors" });
    }
  }

  async getDoctorById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const doctors = await db.query("SELECT * FROM doctors WHERE id = ?", [
        id,
      ]);

      if (doctors.length === 0) {
        res.status(404).json({ error: "Doctor not found" });
        return;
      }

      res.json(doctors[0]);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch doctor" });
    }
  }

  async createDoctor(req: Request, res: Response): Promise<void> {
    try {
      const {
        title,
        description,
        location,
        specialization,
        contactNumber,
        experience,
        latitude,
        longitude,
      } = req.body;
      const image = req.file ? `/api/uploads/${req.file.filename}` : undefined; // Updated path
      const id = uuidv4();

      await db.run(
        `INSERT INTO doctors (id, title, description, location, image, specialization, contactNumber, experience, latitude, longitude) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          id,
          title,
          description,
          location,
          image,
          specialization,
          contactNumber,
          experience,
          latitude,
          longitude,
        ]
      );

      const newDoctor = await db.query("SELECT * FROM doctors WHERE id = ?", [
        id,
      ]);
      res.status(201).json(newDoctor[0]);
    } catch (error) {
      console.error("Error creating doctor:", error);
      res.status(500).json({ error: "Failed to create doctor" });
    }
  }

  async updateDoctor(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const {
        title,
        description,
        location,
        specialization,
        contactNumber,
        experience,
        latitude,
        longitude,
        isAvailable,
      } = req.body;
      const image = req.file ? `/api/uploads/${req.file.filename}` : undefined; // Updated path

      const updateFields = [];
      const params = [];

      if (title) {
        updateFields.push("title = ?");
        params.push(title);
      }
      if (description) {
        updateFields.push("description = ?");
        params.push(description);
      }
      if (location) {
        updateFields.push("location = ?");
        params.push(location);
      }
      if (specialization) {
        updateFields.push("specialization = ?");
        params.push(specialization);
      }
      if (contactNumber) {
        updateFields.push("contactNumber = ?");
        params.push(contactNumber);
      }
      if (experience) {
        updateFields.push("experience = ?");
        params.push(experience);
      }
      if (latitude) {
        updateFields.push("latitude = ?");
        params.push(latitude);
      }
      if (longitude) {
        updateFields.push("longitude = ?");
        params.push(longitude);
      }
      if (isAvailable !== undefined) {
        updateFields.push("isAvailable = ?");
        params.push(isAvailable);
      }
      if (image) {
        updateFields.push("image = ?");
        params.push(image);
      }

      updateFields.push("updatedAt = CURRENT_TIMESTAMP");
      params.push(id);

      if (updateFields.length === 1) {
        res.status(400).json({ error: "No fields to update" });
        return;
      }

      await db.run(
        `UPDATE doctors SET ${updateFields.join(", ")} WHERE id = ?`,
        params
      );

      const updatedDoctor = await db.query(
        "SELECT * FROM doctors WHERE id = ?",
        [id]
      );
      res.json(updatedDoctor[0]);
    } catch (error) {
      console.error("Error updating doctor:", error);
      res.status(500).json({ error: "Failed to update doctor" });
    }
  }

  async deleteDoctor(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await db.run("DELETE FROM doctors WHERE id = ?", [id]);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete doctor" });
    }
  }

  async getDoctorCount(req: Request, res: Response): Promise<void> {
    try {
      const result = await db.query("SELECT COUNT(*) as count FROM doctors");
      res.json({ count: result[0].count });
    } catch (error) {
      res.status(500).json({ error: "Failed to get doctor count" });
    }
  }
}
