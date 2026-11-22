import mongoose from "mongoose";

const nodeSchema = new mongoose.Schema({
  key: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  muscleGroup: { type: String, required: true },
  description: { type: String, required: true },
  x: { type: Number, required: true },
  y: { type: Number, required: true },
  isApex: { type: Boolean, default: false },
  prerequisites: { type: [Number], default: [] },
});

export default mongoose.model("Node", nodeSchema);
