import express from "express";
import userRouter from "./routes/user.route.js";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/error.middleware.js";
import cors from "cors";

const app = express();

app.use(express.json());


app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

// Routes
app.use("/api/users", userRouter);

app.use(cookieParser());

// Error handler middleware
app.use(errorHandler)
export default app;