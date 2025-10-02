import express from "express";
import Event from "../models/Event.js";
import { protect, requireRole } from "../middleware/auth.js";

const router = express.Router();

// Create event (coordinator)
router.post("/", async (req, res) => {
  try {
    const event = await Event.create(req.body);
    res.status(201).json(event);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all approved events (public)
router.get("/", async (req, res) => {
  const events = await Event.find({ approved: true });
  res.json(events);
});

// Admin approval
router.patch("/:id/approve", protect, requireRole("admin"), async (req, res) => {
  const event = await Event.findByIdAndUpdate(
    req.params.id,
    { approved: true },
    { new: true }
  );
  res.json(event);
});

export default router;
