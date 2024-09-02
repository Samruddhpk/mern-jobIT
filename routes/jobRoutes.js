import { Router } from "express";

const router = Router();

import { getAllJobs, getSingleJob, createJob, updateJob, deleteJob } from "../controllers/jobController.js";

// middlewares
import { validateJobInput, validIdParam } from "../middlewares/validationMiddleware.js";

router.route("/").get(getAllJobs).post(validateJobInput, createJob);
router.route("/:id").get(validIdParam, getSingleJob).patch(validIdParam, validateJobInput, updateJob).delete(validIdParam, deleteJob);


export default router;