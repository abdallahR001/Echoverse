import express from "express";
import { createMessage } from "../controllers/message.controll.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", auth,createMessage);

export default router;