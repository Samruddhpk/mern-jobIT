import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../errors/customError.js";

import Job from "../models/Job.js";




// get all jobs
const getAllJobs = async (req, res) => {
    const jobs = await Job.find({});
    res.status(StatusCodes.OK).json({ jobs });
};

// create 
const createJob = async (req, res) => {
    const { company, position } = req.body;
    if (!company || !position) {
        return req.status(400).json({ msg: "please provide company & position" });
    }
    const job = await Job.create({ company, position });
    res.status(StatusCodes.CREATED).json({ job });
};

// get single job
const getSingleJob = async (req, res) => {
    const { id } = req.params;
    const job = await Job.findById(id);
    res.status(StatusCodes.OK).json({ job });
};

// update job
const updateJob = async (req, res) => {
    const { company, position } = req.body;
    if (!company || !position) {
        return res.status(400).json({ msg: 'please provide values' });
    }

    const { id } = req.params;
    const job = await Job.findByIdAndUpdate(id, req.body, { new: true });
    res.status(StatusCodes.OK).json({ msg: 'job updated', job });
};


// delete job
const deleteJob = async (req, res) => {
    const { id } = req.params;
    const job = await Job.findByIdAndDelete(id);
    res.status(StatusCodes.OK).json({ msg: 'job deleted', job });
};


export { getAllJobs, getSingleJob, createJob, updateJob, deleteJob };