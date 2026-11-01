import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./db.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => res.json({ ok: true }));

const port = process.env.PORT || 4000;

connectDB()
  .then(() => {
    app.listen(port, () => console.log(`sovereign-api listening on :${port}`));
  })
  .catch((err) => {
    console.error("Failed to start server:", err.message);
    process.exit(1);
  });
