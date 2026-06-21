import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import path from "path";
import fs from "fs";

const useCloudinary = !!(
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET
);

let storage: multer.StorageEngine;

if (useCloudinary) {
  // Configure Cloudinary SDK client
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });

  console.log("Cloudinary storage provider initialized.");

  // Configure Cloudinary multer storage engine
  storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
      const isVideo = file.mimetype.startsWith("video/");
      return {
        folder: "safenet_moderation",
        resource_type: isVideo ? "video" : "image",
        allowed_formats: isVideo ? ["mp4", "mov", "avi"] : ["jpg", "png", "jpeg", "webp"],
        public_id: `${Date.now()}-${path.parse(file.originalname).name}`
      };
    }
  });
} else {
  // Local fallback storage (perfect for local offline sandbox runs)
  const localUploadDir = path.join(process.cwd(), "uploads");
  if (!fs.existsSync(localUploadDir)) {
    fs.mkdirSync(localUploadDir, { recursive: true });
  }

  console.log(`Cloudinary credentials missing. Falling back to local disk storage at: ${localUploadDir}`);

  storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, localUploadDir);
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, `${Date.now()}-${uuid()}${ext}`);
    }
  });
}

// Simple unique string generator fallback
function uuid(): string {
  return Math.random().toString(36).substring(2, 15);
}

// Uploader validation filters
export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 50 * 1024 * 1024 // 50MB maximum payload
  },
  fileFilter: (req, file, cb) => {
    const isImage = file.mimetype.startsWith("image/");
    const isVideo = file.mimetype.startsWith("video/");
    
    if (isImage || isVideo) {
      cb(null, true);
    } else {
      cb(new Error("Unsupported file format. Images and videos only."));
    }
  }
});
export { cloudinary };
export { useCloudinary };
