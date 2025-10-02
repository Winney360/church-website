import express from "express";
import Gallery from "../models/Gallery.js";
import { protect, requireRole } from "../middleware/auth.js";

const router = express.Router();

// Upload gallery image (coordinator)
router.post("/", async (req, res) => {
  try {
    const image = await Gallery.create(req.body);
    res.status(201).json(image);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all approved images (public)
router.get("/", async (req, res) => {
  try {
    const images = await Gallery.find({ approved: true });
    res.json(images);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin approval
router.patch("/:id/approve", protect, requireRole("admin"), async (req, res) => {
  try {
    const image = await Gallery.findByIdAndUpdate(
      req.params.id,
      { approved: true },
      { new: true }
    );
    if (!image) return res.status(404).json({ message: "Image not found" });
    res.json(image);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
