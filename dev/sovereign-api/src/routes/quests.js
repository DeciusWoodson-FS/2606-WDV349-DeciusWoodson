import { Router } from "express";
import requireUser from "../middleware/requireUser.js";
import asyncHandler from "../middleware/asyncHandler.js";
import { getQuests, completeQuest } from "../controllers/questsController.js";

const router = Router();

router.get("/", requireUser, asyncHandler(getQuests));
router.post("/:key/complete", requireUser, asyncHandler(completeQuest));

export default router;
