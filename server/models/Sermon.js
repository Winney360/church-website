import mongoose from "mongoose";

const sermonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  preacher: String,
  date: { type: Date, required: true },
  videoUrl: String,
  notes: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  approved: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model("Sermon", sermonSchema);
