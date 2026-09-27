import { Router } from "express";
import { auth } from "../middlewares/auth.middleware.js";
import * as universeController from "../controllers/universe.Controll.js";

const router = Router();

router.post("/", auth, universeController.createUniverse);
// adds infos to the universe by embedding it
router.post("/info",auth,universeController.addUniverseInfo)
router.get("/enter/:universeId",auth,universeController.createUserUniverse)
router.get("/universe", auth,universeController.getUserUniverse)
router.get("/",universeController.getUniverses)

export default router;