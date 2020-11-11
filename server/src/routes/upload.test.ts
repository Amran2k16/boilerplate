import request from "supertest";
import { app } from "../app";
import mongoose from "mongoose";

describe("Upload video", () => {
  it("has a route handler listening to /upload for post requests", async () => {
    const response = await request(app).post("/upload").send({});

    expect(response.status).not.toEqual(404);
  });

  it("has a route handler listening to /upload for get requests", async () => {
    const response = await request(app).get("/upload").send({});

    expect(response.status).not.toEqual(404);
  });
});
