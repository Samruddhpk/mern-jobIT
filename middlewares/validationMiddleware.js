import { body, validationResult, param } from "express-validator";
import { BadRequestError, NotFoundError } from "../errors/customError.js";

import { JOB_STATUS, JOB_TYPE } from "../utils/constants.js";
import mongoose from "mongoose";
import Job from "../models/Job.js";



const withValidationErrors = (validateValues) => {

    return [validateValues, (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map((error) => error.msg);
            if (errorMessages[0].startsWith('no job')) {
                throw new NotFoundError(errorMessages);
            }
            throw new BadRequestError(errorMessages);
        }
        next();
    }];
};

// testing validation
// export const validateTest = withValidationErrors(body('name').notEmpty().withMessage('name is required').isLength({ min: 3, max: 50 }).withMessage("name must be between than 3 and 50 characters long").trim());



// TODO: Test location input - default as "my city"
export const validateJobInput = withValidationErrors([body('company').notEmpty().withMessage('company is required'),
body('position').notEmpty().withMessage("position is required"),
body('jobLocation').notEmpty().withMessage('job location is required'),
body('jobStatus').isIn(Object.values(JOB_STATUS)).withMessage('invalid status value'),
body('jobType').isIn(Object.values(JOB_TYPE)).withMessage('invalid job type')
]);


// check for id in params
export const validIdParam = withValidationErrors([
    param('id').custom(async (value) => {
        const isValidId = mongoose.Types.ObjectId.isValid(value);
        if (!isValidId) throw new BadRequestError('invalid mongoDB id');
        const job = await Job.findById(value);
        if (!job) throw new NotFoundError(`no job with id ${value}`);

    })
]);