import { StatusCodes } from "http-status-codes";
import Job from "../models/JobModel.js";
import day from "dayjs";
import mongoose from "mongoose";

// get all jobs
const getAllJobs = async (req, res) => {
    console.log(req);
    const jobs = await Job.find({ createdBy: req.user.userId });
    res.status(StatusCodes.OK).json({ jobs });
};

// create 
const createJob = async (req, res) => {
    req.body.createdBy = req.user.userId;
    const job = await Job.create(req.body);
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


//stats
export const showStats = async (req, res) => {
    let stats = await Job.aggregate([
        { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
        { $group: { _id: '$jobStatus', count: { $sum: 1 } } },
    ]);

    stats = stats.reduce((acc, curr) => {
        const { _id: title, count } = curr;
        acc[title] = count;
        return acc;
    }, {});

    const defaultStats = {
        pending: stats.pending || 0,
        interview: stats.interview || 0,
        declined: stats.declined || 0,
    };

    let monthlyApplications = await Job.aggregate([
        { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
        {
            $group: {
                _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
                count: { $sum: 1 },
            },
        },
        { $sort: { '_id.year': -1, '_id.month': -1 } },
        { $limit: 6 },
    ]);

    monthlyApplications = monthlyApplications
        .map((item) => {
            const {
                _id: { year, month },
                count,
            } = item;

            const date = day()
                .month(month - 1)
                .year(year)
                .format('MMM YY');

            return { date, count };
        })
        .reverse();

    res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};

export { getAllJobs, getSingleJob, createJob, updateJob, deleteJob };