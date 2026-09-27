import express from "express";
import { auth } from "../middlewares/auth.middleware.js";
import { getHome } from "../controllers/home.controll.js";

const router = express.Router();

router.get("/", auth,getHome);

export default router;