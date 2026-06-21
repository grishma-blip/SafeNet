import { Schema, model, Document } from "mongoose";

export interface IRule extends Document {
  ruleType: "KEYWORD" | "REGEX";
  pattern: string;
  label: "HATE_SPEECH" | "SPAM" | "VIOLENCE" | "EXPLICIT";
  createdAt: Date;
}

const RuleSchema = new Schema<IRule>({
  ruleType: { type: String, enum: ["KEYWORD", "REGEX"], required: true },
  pattern: { type: String, required: true, unique: true, trim: true },
  label: { type: String, enum: ["HATE_SPEECH", "SPAM", "VIOLENCE", "EXPLICIT"], required: true },
  createdAt: { type: Date, default: Date.now }
});

export const Rule = model<IRule>("Rule", RuleSchema);
