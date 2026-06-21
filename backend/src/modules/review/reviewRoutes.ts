import { Router } from "express";
import {
  getPendingReviews,
  auditContent,
  getAuditHistory,
  listRules,
  createRule,
  deleteRule,
  getStats
} from "./reviewController";
import { authMiddleware, requireRole } from "../../middleware/auth";

const router = Router();

// Flagged reviews queues
router.get("/pending", authMiddleware, requireRole(["moderator", "admin"]), getPendingReviews);
router.post("/:contentId/audit", authMiddleware, requireRole(["moderator", "admin"]), auditContent);
router.get("/history", authMiddleware, requireRole(["moderator", "admin"]), getAuditHistory);

// Policy config (rules management)
router.get("/rules", authMiddleware, requireRole(["admin"]), listRules);
router.post("/rules", authMiddleware, requireRole(["admin"]), createRule);
router.delete("/rules/:ruleId", authMiddleware, requireRole(["admin"]), deleteRule);

// Telemetry Stats
router.get("/stats", authMiddleware, requireRole(["moderator", "admin"]), getStats);

export default router;
