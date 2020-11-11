import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { User } from "../models/user";
import jwt from "jsonwebtoken";
import { currentUser, validateRequest } from "../middlewares";
const { Storage } = require("@google-cloud/storage");

const router = express.Router();

router.post("/upload", async (req: Request, res: Response) => {
  // Creates a client
  const storage = new Storage();
  // Creates a client from a Google service account key.
  //   const storage = new Storage({ keyFilename: "key.json" });

  /**
   * TODO(developer): Uncomment these variables before running the sample.
   */
  const bucketName = "bucket-name-fasdfhsd";

  async function createBucket() {
    // Creates the new bucket
    await storage.createBucket(bucketName);
    console.log(`Bucket ${bucketName} created.`);
  }

  createBucket().catch(console.error);
  res.send({});
});

export { router as UploadRouter };
