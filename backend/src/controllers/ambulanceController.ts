import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../utils/database';
import { Ambulance, PaginatedResponse } from '../types';

export class AmbulanceController {
  async getAllAmbulances(req: Request, res: Response): Promise<void> {
    try {
      const { page = 1, limit = 10 } = req.query;
      const pageNum = parseInt(page as string);
      const limitNum = parseInt(limit as string);
      const offset = (pageNum - 1) * limitNum;

      const ambulances = await db.query(
        'SELECT * FROM ambulances ORDER BY createdAt DESC LIMIT ? OFFSET ?',
        [limitNum, offset]
      );

      const totalResult = await db.query('SELECT COUNT(*) as count FROM ambulances');
      const total = totalResult[0].count;

      const response: PaginatedResponse<Ambulance> = {
        data: ambulances,
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum)
      };

      res.json(response);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch ambulances' });
    }
  }

  async getAmbulanceById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const ambulances = await db.query('SELECT * FROM ambulances WHERE id = ?', [id]);
      
      if (ambulances.length === 0) {
        res.status(404).json({ error: 'Ambulance not found' });
        return;
      }

      res.json(ambulances[0]);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch ambulance' });
    }
  }

 async createAmbulance(req: Request, res: Response): Promise<void> {
    try {
      const { title, description, location, contactNumber, latitude, longitude } = req.body;
      const image = req.file ? `/api/uploads/${req.file.filename}` : undefined; // Updated path
      const id = uuidv4();

      await db.run(
        `INSERT INTO ambulances (id, title, description, location, image, contactNumber, latitude, longitude) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [id, title, description, location, image, contactNumber, latitude, longitude]
      );

      const newAmbulance = await db.query('SELECT * FROM ambulances WHERE id = ?', [id]);
      res.status(201).json(newAmbulance[0]);
    } catch (error) {
      console.error('Error creating ambulance:', error);
      res.status(500).json({ error: 'Failed to create ambulance' });
    }
  }

  async updateAmbulance(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { title, description, location, contactNumber, latitude, longitude, isAvailable } = req.body;
      const image = req.file ? `/api/uploads/${req.file.filename}` : undefined; // Updated path

      const updateFields = [];
      const params = [];

      if (title) { updateFields.push('title = ?'); params.push(title); }
      if (description) { updateFields.push('description = ?'); params.push(description); }
      if (location) { updateFields.push('location = ?'); params.push(location); }
      if (contactNumber) { updateFields.push('contactNumber = ?'); params.push(contactNumber); }
      if (latitude) { updateFields.push('latitude = ?'); params.push(latitude); }
      if (longitude) { updateFields.push('longitude = ?'); params.push(longitude); }
      if (isAvailable !== undefined) { updateFields.push('isAvailable = ?'); params.push(isAvailable); }
      if (image) { updateFields.push('image = ?'); params.push(image); }

      updateFields.push('updatedAt = CURRENT_TIMESTAMP');
      params.push(id);

      if (updateFields.length === 1) {
        res.status(400).json({ error: 'No fields to update' });
        return;
      }

      await db.run(
        `UPDATE ambulances SET ${updateFields.join(', ')} WHERE id = ?`,
        params
      );

      const updatedAmbulance = await db.query('SELECT * FROM ambulances WHERE id = ?', [id]);
      res.json(updatedAmbulance[0]);
    } catch (error) {
      console.error('Error updating ambulance:', error);
      res.status(500).json({ error: 'Failed to update ambulance' });
    }
  }


  async deleteAmbulance(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await db.run('DELETE FROM ambulances WHERE id = ?', [id]);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete ambulance' });
    }
  }

  async getAmbulanceCount(req: Request, res: Response): Promise<void> {
    try {
      const result = await db.query('SELECT COUNT(*) as count FROM ambulances');
      res.json({ count: result[0].count });
    } catch (error) {
      res.status(500).json({ error: 'Failed to get ambulance count' });
    }
  }
}