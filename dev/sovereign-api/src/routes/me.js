import { Router } from "express";
import requireUser from "../middleware/requireUser.js";
import { getMe } from "../controllers/meController.js";

const router = Router();

router.get("/", requireUser, getMe);

export default router;
