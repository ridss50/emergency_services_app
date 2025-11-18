import sqlite3 from "sqlite3";
import { Database } from "../utils/database";

jest.mock("sqlite3", () => ({
  Database: jest.fn().mockImplementation(() => ({
    run: jest.fn((query, params, callback) => callback?.()),
    all: jest.fn((query, params, callback) => callback?.(null, [])),
    close: jest.fn(),
  })),
}));

describe("Database", () => {
  let database: Database;

  beforeEach(() => {
    database = new Database();
  });

  it("should initialize tables on creation", () => {
    expect(sqlite3.Database).toHaveBeenCalled();
  });

  it("should execute query successfully", async () => {
    const mockRows = [{ id: 1, name: "Test" }];
    (database as any).db.all.mockImplementation(
      (query: any, params: any, callback: any) => {
        callback(null, mockRows);
      }
    );

    const result = await database.query("SELECT * FROM test");
    expect(result).toEqual(mockRows);
  });

  it("should handle query errors", async () => {
    (database as any).db.all.mockImplementation(
      (query: any, params: any, callback: any) => {
        callback(new Error("Database error"));
      }
    );

    await expect(database.query("SELECT * FROM test")).rejects.toThrow(
      "Database error"
    );
  });
});
