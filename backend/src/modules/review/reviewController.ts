import { Request, Response } from "express";
import { Content } from "../../models/Content";
import { AuditLog } from "../../models/AuditLog";
import { Rule } from "../../models/Rule";

export const getPendingReviews = async (req: Request, res: Response) => {
  try {
    // Return all items flagged for human auditing
    const pending = await Content.find({ status: "flagged" })
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({ pending });
  } catch (error) {
    console.error("Fetch pending reviews error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

export const auditContent = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized." });
  }

  const { contentId } = req.params;
  const { actionTaken, reasonCode, notes } = req.body;

  try {
    if (!actionTaken || !["APPROVE", "REJECT"].includes(actionTaken)) {
      return res.status(400).json({ error: "Invalid or missing actionTaken (APPROVE or REJECT)." });
    }

    const content = await Content.findById(contentId);
    if (!content) {
      return res.status(404).json({ error: "Content item not found." });
    }

    // Write audit log entry
    const auditLog = new AuditLog({
      contentId: content.id,
      moderatorId: req.user.id,
      actionTaken,
      reasonCode: reasonCode || "CLEAN",
      notes: notes || undefined
    });
    await auditLog.save();

    // Update status
    content.status = actionTaken === "APPROVE" ? "approved" : "rejected";
    await content.save();

    res.status(200).json({
      message: `Content successfully reviewed and ${actionTaken.toLowerCase()}d.`,
      content
    });
  } catch (error) {
    console.error("Audit action error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

export const getAuditHistory = async (req: Request, res: Response) => {
  try {
    const logs = await AuditLog.find()
      .populate("contentId")
      .populate("moderatorId", "name email")
      .sort({ reviewedAt: -1 })
      .limit(100);

    res.status(200).json({ logs });
  } catch (error) {
    console.error("Fetch audit history error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

// Rules policy config CRUD
export const listRules = async (req: Request, res: Response) => {
  try {
    const rules = await Rule.find().sort({ createdAt: -1 });
    res.status(200).json({ rules });
  } catch (error) {
    console.error("List rules error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

export const createRule = async (req: Request, res: Response) => {
  const { ruleType, pattern, label } = req.body;

  try {
    if (!ruleType || !pattern || !label) {
      return res.status(400).json({ error: "Missing required fields (ruleType, pattern, label)." });
    }

    // Avoid duplicate rules
    const existingRule = await Rule.findOne({ pattern });
    if (existingRule) {
      return res.status(400).json({ error: "Rule with this pattern already exists." });
    }

    const rule = new Rule({ ruleType, pattern, label });
    await rule.save();

    res.status(201).json({ message: "Rule successfully added.", rule });
  } catch (error) {
    console.error("Create rule error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

export const deleteRule = async (req: Request, res: Response) => {
  const { ruleId } = req.params;

  try {
    const deleted = await Rule.findByIdAndDelete(ruleId);
    if (!deleted) {
      return res.status(404).json({ error: "Rule not found." });
    }

    res.status(200).json({ message: "Rule successfully deleted." });
  } catch (error) {
    console.error("Delete rule error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

// Analytics Calculations
export const getStats = async (req: Request, res: Response) => {
  try {
    const totalUploads = await Content.countDocuments();
    const approvedCount = await Content.countDocuments({ status: "approved" });
    const rejectedCount = await Content.countDocuments({ status: "rejected" });
    const flaggedCount = await Content.countDocuments({ status: "flagged" });
    const underReviewCount = await Content.countDocuments({ status: "under_review" });
    const pendingCount = await Content.countDocuments({ status: "pending" });

    // Format distribution
    const textCount = await Content.countDocuments({ contentType: "text" });
    const imageCount = await Content.countDocuments({ contentType: "image" });
    const videoCount = await Content.countDocuments({ contentType: "video" });

    // Calculate dynamic daily trend mapping for the past 7 days
    const trends = [];
    for (let i = 6; i >= 0; i--) {
      const start = new Date();
      start.setDate(start.getDate() - i);
      start.setHours(0, 0, 0, 0);

      const end = new Date();
      end.setDate(end.getDate() - i);
      end.setHours(23, 59, 59, 999);

      const uploads = await Content.countDocuments({ createdAt: { $gte: start, $lte: end } });
      const approved = await Content.countDocuments({ status: "approved", createdAt: { $gte: start, $lte: end } });
      const rejected = await Content.countDocuments({ status: "rejected", createdAt: { $gte: start, $lte: end } });
      const flagged = await Content.countDocuments({ status: "flagged", createdAt: { $gte: start, $lte: end } });

      const dayName = start.toLocaleDateString("en-US", { weekday: "short" });

      trends.push({
        date: dayName,
        uploads,
        approved,
        rejected,
        flagged
      });
    }

    res.status(200).json({
      stats: {
        total: totalUploads,
        approved: approvedCount,
        rejected: rejectedCount,
        flagged: flaggedCount,
        underReview: underReviewCount,
        pending: pendingCount,
        types: {
          text: textCount,
          image: imageCount,
          video: videoCount
        },
        trends
      }
    });
  } catch (error) {
    console.error("Get analytics stats error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};
