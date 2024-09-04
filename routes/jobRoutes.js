import { Router } from "express";

const router = Router();

import { getAllJobs, getSingleJob, createJob, updateJob, deleteJob, showStats } from "../controllers/jobController.js";

// middlewares
import { validateJobInput, validIdParam } from "../middlewares/validationMiddleware.js";
import { checkForTestUser } from "../middlewares/authMiddleware.js";

router.route("/")
    .get(getAllJobs)
    .post(checkForTestUser, validateJobInput, createJob);

router.route("/stats").get(showStats);

router.route("/:id")
    .get(validIdParam, getSingleJob)
    .patch(checkForTestUser, validIdParam, validateJobInput, updateJob)
    .delete(checkForTestUser, validIdParam, deleteJob);



export default router;