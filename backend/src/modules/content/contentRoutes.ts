import { Router } from "express";
import { ingestContent, getUserContentList } from "./contentController";
import { authMiddleware } from "../../middleware/auth";
import { upload } from "../../config/cloudinary";

const router = Router();

// Ingest content (supports text payloads, images, and videos via multer)
router.post("/ingest", authMiddleware, upload.single("file"), ingestContent);

// Get ingestion history for the current user
router.get("/history", authMiddleware, getUserContentList);

export default router;
