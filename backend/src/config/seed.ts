import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import path from "path";

// Load environment configs
dotenv.config({ path: path.join(__dirname, "../../../.env") });

import { User } from "../models/User";
import { Rule } from "../models/Rule";

const seed = async () => {
  const mongoUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/safenet";
  
  console.log(`Connecting to MongoDB at ${mongoUri}...`);
  await mongoose.connect(mongoUri);

  // 1. Seed Default Users
  console.log("Seeding users...");
  await User.deleteMany({});
  
  const salt = await bcrypt.genSalt(10);
  const userPass = await bcrypt.hash("password123", salt);
  const modPass = await bcrypt.hash("modpass123", salt);
  const adminPass = await bcrypt.hash("adminpass123", salt);

  const testUsers = [
    {
      name: "Alice Johnson",
      email: "user@safenet.com",
      passwordHash: userPass,
      role: "user"
    },
    {
      name: "Marcus Aurelius",
      email: "mod@safenet.com",
      passwordHash: modPass,
      role: "moderator"
    },
    {
      name: "Chief Auditor Admin",
      email: "admin@safenet.com",
      passwordHash: adminPass,
      role: "admin"
    }
  ];

  await User.insertMany(testUsers);
  console.log("Successfully seeded users:");
  console.log("  - User: user@safenet.com (password123)");
  console.log("  - Moderator: mod@safenet.com (modpass123)");
  console.log("  - Admin: admin@safenet.com (adminpass123)");

  // 2. Seed Default Moderation Rules
  console.log("Seeding moderation policy rules...");
  await Rule.deleteMany({});

  const defaultRules = [
    { ruleType: "KEYWORD", pattern: "kill", label: "VIOLENCE" },
    { ruleType: "KEYWORD", pattern: "murder", label: "VIOLENCE" },
    { ruleType: "KEYWORD", pattern: "suicide", label: "VIOLENCE" },
    { ruleType: "KEYWORD", pattern: "hate", label: "HATE_SPEECH" },
    { ruleType: "KEYWORD", pattern: "abuse", label: "HATE_SPEECH" },
    { ruleType: "KEYWORD", pattern: "scam", label: "SPAM" },
    { ruleType: "KEYWORD", pattern: "crypto double", label: "SPAM" },
    { ruleType: "KEYWORD", pattern: "buy followers", label: "SPAM" },
    { ruleType: "REGEX", pattern: "\\b[0-9a-fA-F]{40}\\b", label: "SPAM" },
    { ruleType: "REGEX", pattern: "(?i)(win free iphone|click here to claim)", label: "SPAM" }
  ];

  await Rule.insertMany(defaultRules);
  console.log("Successfully seeded 10 default policy rules.");

  await mongoose.disconnect();
  console.log("Database disconnected. Seeding completed successfully.");
};

seed().catch(err => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
