import { Schema, model, Document, Types } from "mongoose";

export interface IAuditLog extends Document {
  contentId: Types.ObjectId;
  moderatorId: Types.ObjectId;
  actionTaken: "APPROVE" | "REJECT";
  reasonCode?: "HATE_SPEECH" | "SPAM" | "NSFW" | "VIOLENCE" | "CLEAN";
  notes?: string;
  reviewedAt: Date;
}

const AuditLogSchema = new Schema<IAuditLog>({
  contentId: { type: Schema.Types.ObjectId, ref: "Content", required: true, index: true },
  moderatorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  actionTaken: { type: String, enum: ["APPROVE", "REJECT"], required: true },
  reasonCode: {
    type: String,
    enum: ["HATE_SPEECH", "SPAM", "NSFW", "VIOLENCE", "CLEAN"],
    default: "CLEAN"
  },
  notes: { type: String, trim: true },
  reviewedAt: { type: Date, default: Date.now }
});

export const AuditLog = model<IAuditLog>("AuditLog", AuditLogSchema);
export default AuditLog;
