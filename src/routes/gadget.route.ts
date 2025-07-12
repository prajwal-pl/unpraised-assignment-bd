import express from "express";
import { authMiddleware } from "../middleware/middleware.js";
import {
  createGadgetHandler,
  getGadgetsHandler,
  getGadgetsByStatusHandler,
  selfDestructGadgetHandler,
} from "../controllers/gadget.controller.js";

const router = express.Router();

router.get("/", authMiddleware, getGadgetsHandler);
router.get("/", authMiddleware, getGadgetsByStatusHandler);
router.post("/", authMiddleware, createGadgetHandler);
router.post("/:id/self-destruct", authMiddleware, selfDestructGadgetHandler);
router.patch("/:id", authMiddleware);
router.delete("/:id", authMiddleware);

export default router;
