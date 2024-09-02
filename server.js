import express from "express";
const app = express();
import morgan from "morgan";
import * as dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

// local imports
import jobsRouter from "./routes/jobRoutes.js";

// middlewares
app.use(express.json());
if (process.env.NODE_ENV === "development") {
    app.use(morgan('dev'));
}

app.get("/", (req, res) => {
    res.status(200).send('<a href="/api/v1/jobs">Jobs</a>');
});

app.use("/api/v1/jobs", jobsRouter);


app.use("*", (req, res) => {
    res.status(404).json({ msg: 'not found' });
});

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({ msg: 'something went wrong...' });
});


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