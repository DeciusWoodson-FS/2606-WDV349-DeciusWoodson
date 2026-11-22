import mongoose from "mongoose";

const questSchema = new mongoose.Schema({
  key: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  xpReward: { type: Number, required: true },
});

export default mongoose.model("Quest", questSchema);
