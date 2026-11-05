import mongoose from "mongoose";

// optimisticConcurrency rejects a save if the user changed after it was loaded,
// so simultaneous requests can't overwrite each other's XP or double-complete.
const userSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true },
    displayName: { type: String, default: "sovereign" },
    level: { type: Number, default: 1 },
    xp: { type: Number, default: 0 },
    masteredNodeKeys: { type: [Number], default: [] },
    completedQuestKeys: { type: [Number], default: [] },
    questsResetAt: { type: Date, default: Date.now },
  },
  { optimisticConcurrency: true }
);

// Simple leveling curve: level N requires N * 100 XP to clear.
userSchema.methods.awardXP = function awardXP(amount) {
  this.xp += amount;
  let xpToNextLevel = this.level * 100;
  while (this.xp >= xpToNextLevel) {
    this.xp -= xpToNextLevel;
    this.level += 1;
    xpToNextLevel = this.level * 100;
  }
};

export default mongoose.model("User", userSchema);
