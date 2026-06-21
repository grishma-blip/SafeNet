import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";

// Load environment config
dotenv.config();

import { connectDB } from "./config/db";
import authRoutes from "./modules/auth/authRoutes";
import contentRoutes from "./modules/content/contentRoutes";
import reviewRoutes from "./modules/review/reviewRoutes";

const app = express();
const PORT = process.env.PORT || 5050;

// Enable CORS
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve local media uploads statically
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// Mount Routing Modules
app.use("/api/auth", authRoutes);
app.use("/api/content", contentRoutes);
app.use("/api/review", reviewRoutes);

// Base health endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "healthy", timestamp: new Date() });
});

// Start server
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`SafeNet Express Server running on port ${PORT}`);
  });
};

startServer();
