import express from 'express'
const router = express.Router()

import {
	createJob,
	getAllJobs,
	updateJob,
	deleteJob,
	showStats,
} from '../controllers/jobsController.js'

// Defining the routes for creating and getting all jobs
router.route('/').post(createJob).get(getAllJobs)
// Defining the route for showing job statistics
router.route('/stats').get(showStats)
// Defining the routes for deleting and updating a job by its id
router.route('/:id').delete(deleteJob).patch(updateJob)

export default router
