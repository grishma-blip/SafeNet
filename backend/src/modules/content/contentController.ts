import { Request, Response } from "express";
import { Content } from "../../models/Content";
import { runModerationPipeline } from "../moderation/moderationService";

export const ingestContent = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized." });
  }

  const { contentType, textPayload } = req.body;
  const file = req.file;

  try {
    if (!contentType || !["text", "image", "video"].includes(contentType)) {
      return res.status(400).json({ error: "Invalid or missing contentType (text, image, video)." });
    }

    let mediaUrl: string | undefined;
    let cloudinaryPublicId: string | undefined;

    // Handle uploaded media file
    if (contentType !== "text") {
      if (!file) {
        return res.status(400).json({ error: `File upload required for format: ${contentType}.` });
      }

      // Check if uploaded via Cloudinary or fallback local uploader
      if ("path" in file) {
        mediaUrl = file.path; // CloudinaryStorage returns path
      }
      
      if ("filename" in file) {
        cloudinaryPublicId = file.filename;
        // If local storage, build local host URL path
        if (!process.env.CLOUDINARY_CLOUD_NAME) {
          const host = req.get("host") || "localhost:5000";
          const protocol = req.protocol || "http";
          mediaUrl = `${protocol}://${host}/uploads/${file.filename}`;
        }
      }
    }

    // Handle text payload validation
    if (contentType === "text" && (!textPayload || textPayload.trim() === "")) {
      return res.status(400).json({ error: "Text payload cannot be empty." });
    }

    // Save Content Metadata record
    const content = new Content({
      userId: req.user.id,
      contentType,
      textPayload: textPayload || undefined,
      mediaUrl,
      cloudinaryPublicId,
      status: "pending"
    });

    await content.save();

    // Trigger moderation scanning pipeline asynchronously (simulating microservices message broker)
    process.nextTick(async () => {
      try {
        await runModerationPipeline(content.id);
      } catch (err) {
        console.error(`Error processing background moderation for content ${content.id}:`, err);
      }
    });

    res.status(202).json({
      message: "Content successfully ingested and queued for moderation.",
      content: {
        id: content.id,
        contentType: content.contentType,
        status: content.status,
        mediaUrl: content.mediaUrl,
        createdAt: content.createdAt
      }
    });
  } catch (error) {
    console.error("Ingest content error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

export const getUserContentList = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized." });
  }

  try {
    const history = await Content.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .limit(100);

    res.status(200).json({ history });
  } catch (error) {
    console.error("Fetch user history error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};
