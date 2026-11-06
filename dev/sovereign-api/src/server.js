import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./db.js";
import nodesRouter from "./routes/nodes.js";
import questsRouter from "./routes/quests.js";
import meRouter from "./routes/me.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => res.json({ ok: true }));
app.use("/api/nodes", nodesRouter);
app.use("/api/quests", questsRouter);
app.use("/api/me", meRouter);

app.use((req, res) => {
  res.status(404).json({ error: `No route for ${req.method} ${req.path}` });
});

// Safety net: an error thrown in an async route/middleware would otherwise
// become an unhandled rejection and crash the whole process.
app.use((err, req, res, next) => {
  if (err.name === "VersionError") {
    return res.status(409).json({ error: "Progress changed, please try again" });
  }
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

const port = process.env.PORT || 4000;

connectDB()
  .then(() => {
    app.listen(port, () => console.log(`sovereign-api listening on :${port}`));
  })
  .catch((err) => {
    console.error("Failed to start server:", err.message);
    process.exit(1);
  });
