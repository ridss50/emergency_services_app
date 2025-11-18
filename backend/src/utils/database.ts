import sqlite3 from "sqlite3";
import path from "path";

const dbPath = path.join(__dirname, "../../data.db");

export class Database {
  private db: sqlite3.Database;

  constructor() {
    this.db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error("Error opening database:", err);
      } else {
        console.log("Connected to SQLite database");
        this.initializeTables();
      }
    });
  }

  private initializeTables(): void {
    const createAmbulancesTable = `
      CREATE TABLE IF NOT EXISTS ambulances (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        location TEXT NOT NULL,
        image TEXT,
        latitude REAL,
        longitude REAL,
        contactNumber TEXT NOT NULL,
        isAvailable BOOLEAN DEFAULT 1,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `;

    const createDoctorsTable = `
      CREATE TABLE IF NOT EXISTS doctors (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        location TEXT NOT NULL,
        image TEXT,
        latitude REAL,
        longitude REAL,
        specialization TEXT NOT NULL,
        contactNumber TEXT NOT NULL,
        isAvailable BOOLEAN DEFAULT 1,
        experience INTEGER DEFAULT 0,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `;

    this.db.run(createAmbulancesTable);
    this.db.run(createDoctorsTable);
  }

  query(sql: string, params: any[] = []): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err: any, rows: any) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }

  run(sql: string, params: any[] = []): Promise<{ id: string }> {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function (err: any) {
        if (err) reject(err);
        else resolve({ id: this.lastID?.toString() || "" });
      });
    });
  }
}

export const db = new Database();
