import React, { useReducer, useContext, useEffect } from 'react'

import reducer from './reducer'
import axios from 'axios'
import {
	DISPLAY_ALERT,
	CLEAR_ALERT,
	SETUP_USER_BEGIN,
	SETUP_USER_SUCCESS,
	SETUP_USER_ERROR,
	TOGGLE_SIDEBAR,
	LOGOUT_USER,
	UPDATE_USER_BEGIN,
	UPDATE_USER_SUCCESS,
	UPDATE_USER_ERROR,
	HANDLE_CHANGE,
	CLEAR_VALUES,
	CREATE_JOB_BEGIN,
	CREATE_JOB_SUCCESS,
	CREATE_JOB_ERROR,
	GET_JOBS_BEGIN,
	GET_JOBS_SUCCESS,
	SET_EDIT_JOB,
	DELETE_JOB_BEGIN,
	DELETE_JOB_ERROR,
	EDIT_JOB_BEGIN,
	EDIT_JOB_SUCCESS,
	EDIT_JOB_ERROR,
	SHOW_STATS_BEGIN,
	SHOW_STATS_SUCCESS,
	GET_CURRENT_USER_BEGIN,
	GET_CURRENT_USER_SUCCESS,
	CLEAR_FILTERS,
	CHANGE_PAGE,
} from './actions'

const initialState = {
	userLoading: true,
	isLoading: false,
	showAlert: false,
	alertText: '',
	alertType: '',
	user: null,
	userLocation: '',
	showSidebar: false,
	isEditing: false,
	editJobId: '',
	position: '',
	company: '',
	jobLocation: '',
	jobTypeOptions: [
		'full-time',
		'part-time',
		'remote',
		'contract',
		'internship',
	],
	jobType: 'full-time',
	statusOptions: ['interview', 'declined', 'pending'],
	status: 'pending',
	jobs: [],
	totalJobs: 0,
	numbOfPages: 1,
	page: 1,
	stats: {},
	monthlyApplications: [],
	search: '',
	searchStatus: 'all',
	searchType: 'all',
	sort: 'latest',
	sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
}

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState)

	// Create an instance of axios with a custom configuration
const authFetch = axios.create({
    // Set the base URL for the API
    baseURL: '/api/v1',
})

// Add an interceptor to the response
authFetch.interceptors.response.use(
    (response) => {
        // Return the response if successful
        return response
    },
    (error) => {
        // If there is an error in the response
        // console.log(error.response)
        // Check if the error status is 401 (unauthorized)
        if (error.response.status === 401) {
            // Call the logoutUser function to log out the user
            logoutUser()
        }
        // Reject the promise with the error
        return Promise.reject(error)
    }
)

	// Define a function to display an alert
const displayAlert = () => {
    // Dispatch an action to display the alert
    dispatch({ type: DISPLAY_ALERT })
    // Call the clearAlert function to clear the alert after a delay
    clearAlert()
}

// Define a function to clear the alert
const clearAlert = () => {
    // Set a timeout to clear the alert after 3000 milliseconds (3 seconds)
    setTimeout(() => {
        // Dispatch an action to clear the alert
        dispatch({ type: CLEAR_ALERT })
    }, 3000)
}

	// Define an asynchronous function called setupUser that takes in an object with properties currentUser, endPoint, and alertText
const setupUser = async ({ currentUser, endPoint, alertText }) => {
	// Dispatch an action to begin setting up the user
	dispatch({ type: SETUP_USER_BEGIN })
	try {
		// Make a POST request to the specified endpoint with the current user data
		const { data } = await axios.post(`/api/v1/auth/${endPoint}`, currentUser)

		// Destructure the user and location properties from the returned data
		const { user, location } = data
		// Dispatch an action to indicate successful setup of the user with the payload containing the user, location, and alertText
		dispatch({
			type: SETUP_USER_SUCCESS,
			payload: { user, location, alertText },
		})
	} catch (error) {
		if (error.response.status === 429) {
			// If the error status is 429 (Too Many Requests), dispatch an action to indicate an error with a message to try again in 15 minutes
			dispatch({
				type: SETUP_USER_ERROR,
				payload: {
					msg: 'Too many failed login attempts, please try again in 15 minutes',
				},
			})
			return
		}
		// Otherwise, dispatch an action to indicate an error with the message from the error response
		dispatch({
			type: SETUP_USER_ERROR,
			payload: { msg: error.response.data.msg },
		})
	}
	clearAlert()
}

	// Define a function called toggleSidebar
const toggleSidebar = () => {
	// Dispatch an action to toggle the sidebar
	dispatch({ type: TOGGLE_SIDEBAR })
}

// Define an asynchronous function called logoutUser
const logoutUser = async () => {
	// Make a GET request to the /auth/logout endpoint
	await authFetch.get('/auth/logout')
	// Dispatch an action to log out the user
	dispatch({ type: LOGOUT_USER })
}

	// Define an asynchronous function called updateUser that takes in a currentUser object
const updateUser = async (currentUser) => {
	// Dispatch an action to begin updating the user
	dispatch({ type: UPDATE_USER_BEGIN })
	try {
		// Make a PATCH request to the /auth/updateUser endpoint with the current user data
		const { data } = await authFetch.patch('/auth/updateUser', currentUser)

		// Destructure the user and location properties from the returned data
		const { user, location } = data

		// Dispatch an action to indicate successful update of the user with the payload containing the user and location
		dispatch({
			type: UPDATE_USER_SUCCESS,
			payload: { user, location },
		})
	} catch (error) {
		if (error.response.status !== 401) {
			// If the error status is not 401 (Unauthorized), dispatch an action to indicate an error with the message from the error response
			dispatch({
				type: UPDATE_USER_ERROR,
				payload: { msg: error.response.data.msg },
			})
		}
	}
	clearAlert()
}

	// Define a function called handleChange that takes in an object with properties name and value
const handleChange = ({ name, value }) => {
	// Dispatch an action to handle a change with the payload containing the name and value
	dispatch({ type: HANDLE_CHANGE, payload: { name, value } })
}

// Define a function called clearValues
const clearValues = () => {
	// Dispatch an action to clear values
	dispatch({ type: CLEAR_VALUES })
}

// Define an asynchronous function called createJob
const createJob = async () => {
	// Dispatch an action to begin creating a job
	dispatch({ type: CREATE_JOB_BEGIN })
	try {
		// Destructure the position, company, jobLocation, jobType, and status properties from the state object
		const { position, company, jobLocation, jobType, status } = state
		// Make a POST request to the /jobs endpoint with the data for the new job
		await authFetch.post('/jobs', {
			position,
			company,
			jobLocation,
			jobType,
			status,
		})
		// Dispatch an action to indicate successful creation of the job
		dispatch({ type: CREATE_JOB_SUCCESS })
		// Dispatch an action to clear values
		dispatch({ type: CLEAR_VALUES })
	} catch (error) {
		if (error.response.status === 401) return
		// If the error status is not 401 (Unauthorized), dispatch an action to indicate an error with the message from the error response
		dispatch({
			type: CREATE_JOB_ERROR,
			payload: { msg: error.response.data.msg },
		})
	}
	clearAlert()
}

	// Define an asynchronous function called getJobs
const getJobs = async () => {
	// Destructure the page, search, searchStatus, searchType, and sort properties from the state object
	const { page, search, searchStatus, searchType, sort } = state

	// Construct the URL for the GET request with query parameters for page, status, jobType, and sort
	let url = `/jobs?page=${page}&status=${searchStatus}&jobType=${searchType}&sort=${sort}`
	if (search) {
		// If there is a search value, add it to the URL as a query parameter
		url = url + `&search=${search}`
	}
	// Dispatch an action to begin getting jobs
	dispatch({ type: GET_JOBS_BEGIN })
	try {
		// Make a GET request to the constructed URL
		const { data } = await authFetch(url)
		// Destructure the jobs, totalJobs, and numOfPages properties from the returned data
		const { jobs, totalJobs, numOfPages } = data
		// Dispatch an action to indicate successful retrieval of jobs with the payload containing the jobs, totalJobs, and numOfPages
		dispatch({
			type: GET_JOBS_SUCCESS,
			payload: {
				jobs,
				totalJobs,
				numOfPages,
			},
		})
	} catch (error) {
		logoutUser()
	}
	clearAlert()
}

	// Define a function called setEditJob that takes in an id parameter
const setEditJob = (id) => {
	// Dispatch an action to set the job to be edited with the payload containing the id
	dispatch({ type: SET_EDIT_JOB, payload: { id } })
}

	// Define an asynchronous function called editJob
const editJob = async () => {
	// Dispatch an action to begin editing a job
	dispatch({ type: EDIT_JOB_BEGIN })
	try {
		// Destructure the position, company, jobLocation, jobType, and status properties from the state object
		const { position, company, jobLocation, jobType, status } = state
		// Make a PATCH request to the /jobs/{editJobId} endpoint with the updated data for the job
		await authFetch.patch(`/jobs/${state.editJobId}`, {
			company,
			position,
			jobLocation,
			jobType,
			status,
		})
		// Dispatch an action to indicate successful editing of the job
		dispatch({ type: EDIT_JOB_SUCCESS })
		// Dispatch an action to clear values
		dispatch({ type: CLEAR_VALUES })
	} catch (error) {
		if (error.response.status === 401) return
		// If the error status is not 401 (Unauthorized), dispatch an action to indicate an error with the message from the error response
		dispatch({
			type: EDIT_JOB_ERROR,
			payload: { msg: error.response.data.msg },
		})
	}
	clearAlert()
}

// Define an asynchronous function called deleteJob that takes in a jobId parameter
const deleteJob = async (jobId) => {
	// Dispatch an action to begin deleting a job
	dispatch({ type: DELETE_JOB_BEGIN })
	try {
		// Make a DELETE request to the /jobs/{jobId} endpoint
		await authFetch.delete(`/jobs/${jobId}`)
		// Call the getJobs function to update the list of jobs
		getJobs()
	} catch (error) {
		if (error.response.status === 401) return
		// If the error status is not 401 (Unauthorized), dispatch an action to indicate an error with the message from the error response
		dispatch({
			type: DELETE_JOB_ERROR,
			payload: { msg: error.response.data.msg },
		})
	}
	clearAlert()
}

	// Define an asynchronous function called showStats
const showStats = async () => {
	// Dispatch an action to begin showing stats
	dispatch({ type: SHOW_STATS_BEGIN })
	try {
		// Make a GET request to the /jobs/stats endpoint
		const { data } = await authFetch('/jobs/stats')
		// Dispatch an action to indicate successful retrieval of stats with the payload containing the defaultStats and monthlyApplications properties from the returned data
		dispatch({
			type: SHOW_STATS_SUCCESS,
			payload: {
				stats: data.defaultStats,
				monthlyApplications: data.monthlyApplications,
			},
		})
	} catch (error) {
		logoutUser()
	}
	clearAlert()
}

	// Define an asynchronous function called getCurrentUser
const getCurrentUser = async () => {
	// Dispatch an action to begin getting the current user
	dispatch({ type: GET_CURRENT_USER_BEGIN })
	try {
		// Make a GET request to the /auth/getCurrentUser endpoint
		const { data } = await authFetch('/auth/getCurrentUser')
		// Destructure the user and location properties from the returned data
		const { user, location } = data

		// Dispatch an action to indicate successful retrieval of the current user with the payload containing the user and location
		dispatch({
			type: GET_CURRENT_USER_SUCCESS,
			payload: { user, location },
		})
	} catch (error) {
		if (error.response.status === 401) return
		logoutUser()
	}
}

	// Call the useEffect hook to run the getCurrentUser function when the component mounts
useEffect(() => {
	getCurrentUser()
	// eslint-disable-next-line react-hooks/exhaustive-deps
}, [])

// Define a function called clearFilters
const clearFilters = () => {
	// Dispatch an action to clear filters
	dispatch({ type: CLEAR_FILTERS })
}

// Define a function called changePage that takes in a page parameter
const changePage = (page) => {
	// Dispatch an action to change the page with the payload containing the page
	dispatch({ type: CHANGE_PAGE, payload: { page } })
}

	return (
		<AppContext.Provider
			value={{
				...state,
				displayAlert,
				setupUser,
				toggleSidebar,
				logoutUser,
				updateUser,
				handleChange,
				clearValues,
				createJob,
				getJobs,
				setEditJob,
				editJob,
				deleteJob,
				showStats,
				clearFilters,
				changePage,
			}}
		>
			{children}
		</AppContext.Provider>
	)
}

const useAppContext = () => {
	return useContext(AppContext)
}

export { initialState, AppProvider, useAppContext }
