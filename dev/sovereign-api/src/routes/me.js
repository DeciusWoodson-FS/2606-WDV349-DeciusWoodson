import { Router } from "express";
import requireUser from "../middleware/requireUser.js";
import asyncHandler from "../middleware/asyncHandler.js";
import { getMe } from "../controllers/meController.js";

const router = Router();

router.get("/", requireUser, asyncHandler(getMe));

export default router;
