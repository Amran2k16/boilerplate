import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { User } from "../models/user";
import jwt from "jsonwebtoken";
import { currentUser, requireAuth, validateRequest } from "../middlewares";
const multer = require("multer");
var upload = multer({ dest: "uploads/" });
const { Storage } = require("@google-cloud/storage");

const router = express.Router();

router.post(
  "/upload",
  requireAuth,
  upload.any(),
  //   [body("filename").not().isEmpty().withMessage("filename is required")],
  //   validateRequest,
  async (req: Request | any, res: Response) => {
    const file = req.files[0];
    console.log("file", file);
    const storage = new Storage();

    async function uploadFile() {
      // Uploads a local file to the bucket
      await storage.bucket("vidnote").upload(file.path, {
        // Support for HTTP requests made with `Accept-Encoding: gzip`
        destination: file.originalname,
        gzip: true,
        metadata: {
          cacheControl: "public, max-age=31536000",
        },
      });
      // req.currentUser!.id
      console.log(`uploaded to vidnote`);
    }

    uploadFile().catch(console.error);
    res.send({});
  }
);

export { router as UploadRouter };
