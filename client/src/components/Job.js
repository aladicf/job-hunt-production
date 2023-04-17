import moment from 'moment'
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/Job'
import JobInfo from './JobInfo'

// Define a functional component named Job that takes in several props
const Job = ({
	_id,
	position,
	company,
	jobLocation,
	jobType,
	createdAt,
	status,
}) => {
	// Destructure setEditJob and deleteJob from the value returned by useAppContext hook
	const { setEditJob, deleteJob } = useAppContext()

	// Declare a variable named date and initialize it to the value of createdAt passed through moment
	let date = moment(createdAt)
	// Format the date variable using the format method
	date = date.format('MMM Do, YYYY')
	// Return a Wrapper component
	return (
		<Wrapper>
			{/* Render a header element */}
			<header>
				{/* Render a div element with a className of main-icon and display the first character of company */}
				<div className='main-icon'>{company.charAt(0)}</div>
				{/* Render a div element with a className of info */}
				<div className='info'>
					{/* Render a h5 element with the value of position */}
					<h5>{position}</h5>
					{/* Render a p element with the value of company */}
					<p>{company}</p>
				</div>
			</header>
			{/* Render a div element with a className of content */}
			<div className='content'>
				{/* Render a div element with a className of content-center */}
				<div className='content-center'>
					{/* Render a JobInfo component with specified icon and text props */}
					<JobInfo icon={<FaLocationArrow />} text={jobLocation} />
					{/* Render a JobInfo component with specified icon and text props */}
					<JobInfo icon={<FaCalendarAlt />} text={date} />
					{/* Render a JobInfo component with specified icon and text props */}
					<JobInfo icon={<FaBriefcase />} text={jobType} />
					{/* Render a div element with a dynamic className based on the value of status and display the value of status */}
					<div className={`status ${status}`}>{status}</div>
				</div>
				{/* Render a footer element */}
				<footer>
					{/* Render a div element with a className of actions */}
					<div className='actions'>
						{/* Render a Link component with specified to, className and onClick props */}
						<Link
							to='/add-job'
							className='btn edit-btn'
							onClick={() => setEditJob(_id)}
						>
							Edit
						</Link>
						{/* Render a button element with specified type, className and onClick props */}
						<button
							type='button'
							className='btn delete-btn'
							onClick={() => deleteJob(_id)}
						>
							Delete
						</button>
					</div>
				</footer>
			</div>
		</Wrapper>
	)
}

export default Job
