import "express-async-errors";
import express from "express";
const app = express();
import morgan from "morgan";
import * as dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import cloudinary from "cloudinary";



import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";


// local imports
import errorHandlerMiddleware from "./middlewares/errorHandlerMiddleware.js";
import { authenticateUser } from "./middlewares/authMiddleware.js";

import jobsRouter from "./routes/jobRoutes.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

// middlewares
if (process.env.NODE_ENV === "development") {
    app.use(morgan('dev'));
}
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.resolve(__dirname, './public')));
app.use(express.json());
app.use(cookieParser());
app.use(cors());



app.get("/", (req, res) => {
    res.status(200).send('<a href="/api/v1/jobs">Jobs</a>');
});

app.get("/api/v1/test", (req, res) => {
    res.json({ msg: 'test route' });
});


app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticateUser, jobsRouter);
app.use("/api/v1/users", authenticateUser, userRouter);

app.use(express.static(path.resolve(__dirname, "./client/dist")));

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./client/dist", "index.html"));
});

app.use("*", (req, res) => {
    res.status(404).json({ msg: 'not found' });
});

app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("connected DB");
        app.listen(port, () => console.log(`server listening on port: ${port}`));
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};


start();