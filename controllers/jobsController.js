import Job from '../models/Job.js'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, NotFoundError } from '../errors/index.js'
import checkPermissions from '../utils/checkPermissions.js'
import mongoose from 'mongoose'
import moment from 'moment'

const createJob = async (req, res) => {
    const { body: { position, company }, user: { userId } } = req

    if (!position || !company || position.trim() === '' || company.trim() === '') {
        throw new BadRequestError('Please provide valid values for position and company')
    }

    const job = await Job.create({ ...req.body, createdBy: userId })
    res.status(StatusCodes.CREATED).json({ job })
}

const getAllJobs = async (req, res) => {
    const { query: { status, jobType, sort, search, page, limit }, user: { userId } } = req

    const queryObject = {
        createdBy: userId,
    }

    if (status && status !== 'all') {
        queryObject.status = status
    }
    if (jobType && jobType !== 'all') {
        queryObject.jobType = jobType
    }
    if (search) {
        queryObject.position = { $regex: search, $options: 'i' }
    }

    let result = Job.find(queryObject)

    // Chain sort conditions

    switch (sort) {
        case 'latest':
            result = result.sort('-createdAt')
            break
        case 'oldest':
            result = result.sort('createdAt')
            break
        case 'a-z':
            result = result.sort('position')
            break
        case 'z-a':
            result = result.sort('-position')
            break
    }

    // Setup pagination

    const pageNumber = Number(page) || 1
    const pageLimit = Number(limit) || 10
    const skip = (pageNumber - 1) * pageLimit

    result = result.skip(skip).limit(pageLimit)

    const jobs = await result

    const totalJobs = await Job.countDocuments(queryObject)
    const numOfPages = Math.ceil(totalJobs / pageLimit)

    res.status(StatusCodes.OK).json({ jobs, totalJobs, numOfPages })
}

const updateJob = async (req, res) => {
    const { params: { id: jobId }, body: { company, position }, user } = req

    if (!position || !company || position.trim() === '' || company.trim() === '') {
        throw new BadRequestError('Please provide valid values for position and company')
    }

    const job = await Job.findOne({ _id: jobId })

    if (!job) {
        throw new NotFoundError(`No job with id :${jobId}`)
    }

    // Check permissions
    await checkPermissions(user, job.createdBy)

    const updatedJob = await Job.findOneAndUpdate({ _id: jobId }, req.body, {
        new: true,
        runValidators: true,
    })

    res.status(StatusCodes.OK).json({ updatedJob })
} 

const deleteJob = async (req, res) => {
    const { params: { id: jobId }, user } = req

    const job = await Job.findOne({ _id: jobId })

    if (!job) {
        throw new NotFoundError(`No job with id :${jobId}`)
    }

    // Check permissions
    await checkPermissions(user, job.createdBy)

    await Job.findByIdAndDelete(jobId)

    res.status(StatusCodes.OK).json({ msg: 'Success! Job removed' })
}

const showStats = async (req, res) => {
    const { user: { userId } } = req

    let stats = await Job.aggregate([
		{ $match: { createdBy: mongoose.Types.ObjectId(userId) } },
		{ $group: { _id: '$status', count: { $sum: 1 } } },
	])
	stats = stats.reduce((acc, curr) => {
		const { _id: title, count } = curr
		acc[title] = count
		return acc
	}, {})

	const defaultStats = {
		pending: stats.pending || 0,
		interview: stats.interview || 0,
		declined: stats.declined || 0,
	}

	let monthlyApplications = await Job.aggregate([
		{ $match: { createdBy: mongoose.Types.ObjectId(userId) } },
		{
			$group: {
				_id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
				count: { $sum: 1 },
			},
		},
		{ $sort: { '_id.year': -1, '_id.month': -1 } },
		{ $limit: 12 },
	])
	monthlyApplications = monthlyApplications
		.map((item) => {
			const {
				_id: { year, month },
				count,
			} = item
			const date = moment()
				.month(month - 1)
				.year(year)
				.format('MMMM Y')
			return { date, count }
		})
		.reverse()

	res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications })
}

export { createJob, deleteJob, getAllJobs, updateJob, showStats }
