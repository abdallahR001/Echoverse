import express from "express";
import userRouter from "./routes/user.route.js";
import universeRouter from "./routes/universe.route.js"
import messageRouter from "./routes/message.route.js"
import homeRouter from "./routes/home.route.js"
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/error.middleware.js";
import cors from "cors";

const app = express();

app.use(cookieParser());
app.use(express.json());


app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

// Routes
app.use("/api/users", userRouter);
app.use("/api/universes", universeRouter)
app.use("/api/messages",messageRouter)
app.use("/api/home",homeRouter)

// Error handler middleware
app.use(errorHandler)
export default app;