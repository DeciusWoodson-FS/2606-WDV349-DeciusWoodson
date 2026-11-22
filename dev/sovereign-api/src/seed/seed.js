import "dotenv/config";
import { connectDB } from "../db.js";
import Node from "../models/Node.js";
import Quest from "../models/Quest.js";
import mongoose from "mongoose";

// Mirrors the fixture data in dev/sovereign-app/src/pages/SkillTreePage.jsx.
// The `connections` pairs there ([parentId, childId]) become each node's
// `prerequisites` list here.
const nodes = [
  {
    key: 1,
    name: "Standard Pushup",
    muscleGroup: "Chest / Triceps / Shoulders",
    description: "Keep a straight line from shoulders to heels. Full range of motion, chest to floor.",
    x: 50,
    y: 85,
    isApex: false,
    prerequisites: [],
  },
  {
    key: 2,
    name: "Diamond Pushup",
    muscleGroup: "Triceps / Chest",
    description: "Hands together under the chest. Builds the tricep strength needed for planche work.",
    x: 50,
    y: 70,
    isApex: false,
    prerequisites: [1],
  },
  {
    key: 3,
    name: "Pseudo Planche",
    muscleGroup: "Shoulders / Core",
    description: "Lean forward past your hands, protract the scapula, and hold. Focus on core compression.",
    x: 35,
    y: 55,
    isApex: false,
    prerequisites: [2],
  },
  {
    key: 4,
    name: "Archer Pushup",
    muscleGroup: "Chest / Shoulders",
    description: "Shift weight to one arm while the other stays extended. Builds unilateral pressing strength.",
    x: 65,
    y: 55,
    isApex: false,
    prerequisites: [2],
  },
  {
    key: 5,
    name: "Tuck Planche",
    muscleGroup: "Shoulders / Core",
    description: "Knees tucked to chest, feet off the ground, weight fully on the hands. Hold for time.",
    x: 20,
    y: 40,
    isApex: false,
    prerequisites: [3],
  },
  {
    key: 6,
    name: "Planche Lean",
    muscleGroup: "Shoulders / Core",
    description: "Deepen the forward lean from the pseudo planche, feet still grounded, shoulders past the hands.",
    x: 45,
    y: 40,
    isApex: false,
    prerequisites: [3],
  },
  {
    key: 7,
    name: "One-Arm Pushup",
    muscleGroup: "Chest / Triceps / Core",
    description: "Full pushup on a single arm with the other hand off the ground. Heavy anti-rotation demand.",
    x: 80,
    y: 40,
    isApex: false,
    prerequisites: [4],
  },
  {
    key: 8,
    name: "Full Planche",
    muscleGroup: "Shoulders / Core",
    description: "Body fully horizontal, feet off the ground, straight arms. The apex hold of the pushing line.",
    x: 50,
    y: 20,
    isApex: true,
    prerequisites: [5, 6, 7],
  },
];

const quests = [
  { key: 1, title: "100 Pushups", xpReward: 50 },
  { key: 2, title: "5x10 Pullups", xpReward: 50 },
  { key: 3, title: "150g Protein", xpReward: 50 },
  { key: 4, title: "10 Min L-Sit Grind", xpReward: 50 },
];

async function seed() {
  await connectDB();

  for (const node of nodes) {
    await Node.findOneAndUpdate({ key: node.key }, node, { upsert: true, new: true });
  }
  for (const quest of quests) {
    await Quest.findOneAndUpdate({ key: quest.key }, quest, { upsert: true, new: true });
  }

  console.log(`Seeded ${nodes.length} nodes and ${quests.length} quests.`);
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
