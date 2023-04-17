import Job from '../models/Job.js'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, NotFoundError } from '../errors/index.js'
import checkPermissions from '../utils/checkPermissions.js'
import mongoose from 'mongoose'
import moment from 'moment'

// Define an asynchronous createJob function that takes a request and response object as parameters
const createJob = async (req, res) => {
  // Extract the position and company properties from the request body and the userId property from the request user object
  const { body: { position, company }, user: { userId } } = req

  // Check if the position and company values are valid
  if (!position || !company || position.trim() === '' || company.trim() === '') {
    // If the values are not valid, throw a BadRequestError with a custom error message
    throw new BadRequestError('Please provide valid values for position and company')
  }

  // Create a new Job document in the database using the data from the request body and the userId
  const job = await Job.create({ ...req.body, createdBy: userId })

  // Send a response with a status code of 201 (created) and the created job in JSON format
  res.status(StatusCodes.CREATED).json({ job })
}

// Define an asynchronous getAllJobs function that takes a request and response object as parameters
const getAllJobs = async (req, res) => {
  // Extract query parameters from the request object
  const { query: { status, jobType, sort, search, page, limit }, user: { userId } } = req

  // Construct a queryObject to filter jobs based on the provided query parameters
  const queryObject = {
    createdBy: userId,
  }

  // Add the status property to the queryObject if it is provided and not equal to 'all'
  if (status && status !== 'all') {
    queryObject.status = status
  }
  // Add the jobType property to the queryObject if it is provided and not equal to 'all'
  if (jobType && jobType !== 'all') {
    queryObject.jobType = jobType
  }
  // Add the position property to the queryObject as a regular expression if the search parameter is provided
  if (search) {
    queryObject.position = { $regex: search, $options: 'i' }
  }

  // Use the Job.find method to query the database for jobs that match the queryObject
  let result = Job.find(queryObject)

    // Apply sorting based on the provided sort parameter
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


     // Calculate pagination values based on the provided page and limit parameters or use default values
  const pageNumber = Number(page) || 1
  const pageLimit = Number(limit) || 10
  const skip = (pageNumber - 1) * pageLimit

  // Apply pagination to the result using the calculated values
  result = result.skip(skip).limit(pageLimit)

  // Execute the query and get an array of jobs from the database
  const jobs = await result

  // Get the total number of jobs that match the queryObject using the Job.countDocuments method
  const totalJobs = await Job.countDocuments(queryObject)
  // Calculate the number of pages based on the total number of jobs and page limit
  const numOfPages = Math.ceil(totalJobs / pageLimit)

  // Send a response with a status code of 200 (OK) and an object containing the jobs, total number of jobs, and number of pages in JSON format
  res.status(StatusCodes.OK).json({ jobs, totalJobs, numOfPages })
}

// Define an asynchronous updateJob function that takes a request and response object as parameters
const updateJob = async (req, res) => {
  // Extract the job ID from the request parameters and the company and position properties from the request body
  const { params: { id: jobId }, body: { company, position }, user } = req

  // Check if the position and company values are valid
  if (!position || !company || position.trim() === '' || company.trim() === '') {
    // If the values are not valid, throw a BadRequestError with a custom error message
    throw new BadRequestError('Please provide valid values for position and company')
  }

  // Use the Job.findOne method to find a job with the specified ID in the database
  const job = await Job.findOne({ _id: jobId })

  // If no job is found, throw a NotFoundError with a custom error message
  if (!job) {
    throw new NotFoundError(`No job with id :${jobId}`)
  }

    // Check if the user has permission to update the job by calling the checkPermissions function
  await checkPermissions(user, job.createdBy)

  // Use the Job.findOneAndUpdate method to update the job in the database with the data from the request body
  const updatedJob = await Job.findOneAndUpdate({ _id: jobId }, req.body, {
    new: true,
    runValidators: true,
  })

  // Send a response with a status code of 200 (OK) and the updated job in JSON format
  res.status(StatusCodes.OK).json({ updatedJob })
}

// Define an asynchronous deleteJob function that takes a request and response object as parameters
const deleteJob = async (req, res) => {
  // Extract the job ID from the request parameters
  const { params: { id: jobId }, user } = req

  // Use the Job.findOne method to find a job with the specified ID in the database
  const job = await Job.findOne({ _id: jobId })

  // If no job is found, throw a NotFoundError with a custom error message
  if (!job) {
    throw new NotFoundError(`No job with id :${jobId}`)
  }

  // Check if the user has permission to delete the job by calling the checkPermissions function
  await checkPermissions(user, job.createdBy)

  // Use the Job.findByIdAndDelete method to delete the job from the database
  await Job.findByIdAndDelete(jobId)

  // Send a response with a status code of 200 (OK) and a success message in JSON format
  res.status(StatusCodes.OK).json({ msg: 'Success! Job removed' })
}

// Define an asynchronous showStats function that takes a request and response object as parameters
const showStats = async (req, res) => {
  // Extract the userId from the request user object
  const { user: { userId } } = req

  // Use the Job.aggregate method to perform an aggregation query on the Job collection
  // Group jobs by their status property and calculate the count of jobs for each status
  let stats = await Job.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(userId) } },
    { $group: { _id: '$status', count: { $sum: 1 } } },
  ])
  // Format the result of the aggregation query as an object with properties for each job status
  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr
    acc[title] = count
    return acc
  }, {})

	// Define default values for job statistics
  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  }

  // Use the Job.aggregate method to perform another aggregation query on the Job collection
  // Group jobs by their createdAt property and calculate the count of jobs for each month in the past 12 months
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
  // Format the result of the aggregation query as an array of objects with date and count properties
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

  // Send a response with a status code of 200 (OK) and an object containing the job statistics in JSON format
  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications })
}

export { createJob, deleteJob, getAllJobs, updateJob, showStats }
