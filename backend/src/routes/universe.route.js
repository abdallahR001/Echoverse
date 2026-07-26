import { Router } from "express";
import { auth } from "../middlewares/auth.middleware.js";
import * as universeController from "../controllers/universe.Controll.js";

const router = Router();

router.post("/", auth, universeController.createUniverse);

export default router;