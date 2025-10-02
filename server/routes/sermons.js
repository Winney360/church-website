import express from "express";
import Sermon from "../models/Sermon.js";
import { protect, requireRole } from "../middleware/auth.js";

const router = express.Router();

// Create sermon (coordinator)
router.post("/", async (req, res) => {
  try {
    const sermon = await Sermon.create(req.body);
    res.status(201).json(sermon);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all approved sermons (public)
router.get("/", async (req, res) => {
  try {
    const sermons = await Sermon.find({ approved: true });
    res.json(sermons);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin approval
router.patch("/:id/approve",protect, requireRole("admin"), async (req, res) => {
  try {
    const sermon = await Sermon.findByIdAndUpdate(
      req.params.id,
      { approved: true },
      { new: true }
    );
    if (!sermon) return res.status(404).json({ message: "Sermon not found" });
    res.json(sermon);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
