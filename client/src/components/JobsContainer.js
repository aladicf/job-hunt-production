import { useAppContext } from '../context/appContext'
import { useEffect } from 'react'
import Loading from './Loading'
import Job from './Job'
import Alert from './Alert'
import Wrapper from '../assets/wrappers/JobsContainer'
import PageBtnContainer from './PageBtnContainer'

// Define a functional component named JobsContainer
const JobsContainer = () => {
	// Destructure several values from the value returned by useAppContext hook
	const {
		getJobs,
		jobs,
		isLoading,
		page,
		totalJobs,
		search,
		searchStatus,
		searchType,
		sort,
		numOfPages,
		showAlert,
	} = useAppContext()
	// Use the useEffect hook to call getJobs when the component mounts or when any of the specified dependencies change
	useEffect(() => {
		getJobs()
		// eslint-disable-next-line
	}, [page, search, searchStatus, searchType, sort])
	// If isLoading is true, return a Loading component with a center prop
	if (isLoading) {
		return <Loading center />
	}

	// If the length of jobs is 0, return a Wrapper component with a message
	if (jobs.length === 0) {
		return (
			<Wrapper>
				<h2>No jobs to display...</h2>
			</Wrapper>
		)
	}

	// Return a Wrapper component
	return (
		<Wrapper>
			{/* Conditionally render an Alert component if showAlert is true */}
			{showAlert && <Alert />}
			{/* Render a h5 element with the value of totalJobs and conditionally add an 's' to 'job' if there is more than one job */}
			<h5>
				{totalJobs} job{jobs.length > 1 && 's'} found
			</h5>
			{/* Render a div element with a className of jobs */}
			<div className='jobs'>
				{/* Map over the jobs array and render a Job component for each job */}
				{jobs.map((job) => {
					return <Job key={job._id} {...job} />
				})}
			</div>
			{/* Render a div element with a className of center and conditionally render a PageBtnContainer component if numOfPages is greater than 1 */}
			<div className='center'>{numOfPages > 1 && <PageBtnContainer />}</div>
		</Wrapper>
	)
}

export default JobsContainer
