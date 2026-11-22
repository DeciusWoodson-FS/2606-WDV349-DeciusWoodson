import { Router } from "express";
import requireUser from "../middleware/requireUser.js";
import asyncHandler from "../middleware/asyncHandler.js";
import { getNodes, masterNode } from "../controllers/nodesController.js";

const router = Router();

router.get("/", requireUser, asyncHandler(getNodes));
router.post("/:key/master", requireUser, asyncHandler(masterNode));

export default router;
