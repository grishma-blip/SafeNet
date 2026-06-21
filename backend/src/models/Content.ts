import { Schema, model, Document, Types } from "mongoose";

export interface IContent extends Document {
  userId: Types.ObjectId;
  contentType: "text" | "image" | "video";
  textPayload?: string;
  mediaUrl?: string;
  cloudinaryPublicId?: string;
  status: "pending" | "under_review" | "approved" | "rejected" | "flagged";
  createdAt: Date;
  updatedAt: Date;
}

const ContentSchema = new Schema<IContent>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    contentType: { type: String, enum: ["text", "image", "video"], required: true },
    textPayload: { type: String, trim: true },
    mediaUrl: { type: String, trim: true },
    cloudinaryPublicId: { type: String },
    status: {
      type: String,
      enum: ["pending", "under_review", "approved", "rejected", "flagged"],
      default: "pending",
      index: true
    }
  },
  { timestamps: true }
);

export const Content = model<IContent>("Content", ContentSchema);
