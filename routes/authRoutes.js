import express from "express";
const router = express.Router();

import { login, register } from "../controllers/authController.js";
import { validateRegisterInput, validateLoginInput } from "../middlewares/validationMiddleware.js";

router.route("/login").post(validateLoginInput, login);
router.route("/register").post(validateRegisterInput, register);


export default router;