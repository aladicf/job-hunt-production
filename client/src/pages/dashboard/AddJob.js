import { FormRow, FormRowSelect, Alert } from '../../components'
import { useAppContext } from '../../context/appContext'
import Wrapper from '../../assets/wrappers/DashboardFormPage'

const AddJob = () => {
	const {
		isLoading,
		showAlert,
		displayAlert,
		isEditing,
		editJob,
		position,
		company,
		jobLocation,
		jobType,
		jobTypeOptions,
		status,
		statusOptions,
		handleChange,
		clearValues,
		createJob,
	} = useAppContext()

	// Define handleSubmit function
const handleSubmit = (e) => {
	// Prevent default form submission behavior
	e.preventDefault()

	// Check if position, company, and jobLocation values are defined
	if (!position || !company || !jobLocation) {
		// Call displayAlert function
		displayAlert()
		return
	}
	// If isEditing is true, call editJob function
	if (isEditing) {
		editJob()
	}
	// Call createJob function
	createJob()
}

// Define handleJobInput function
const handleJobInput = ({ target: { name, value } }) => {
	// Call handleChange function with name and value properties
	handleChange({ name, value });
}

	return (
		<Wrapper>
			<form className='form'>
				{/* Heading displaying either "edit job" or "add job" */}
				<h3>{isEditing ? 'edit job' : 'add job'}</h3>
				{/* Conditional rendering of Alert component */}
				{showAlert && <Alert />}
				{/* FormRow components for position, company, and jobLocation inputs */}
				<div className='form-center'>
					<FormRow
						type='text'
						name='position'
						value={position}
						handleChange={handleJobInput}
					/>

					<FormRow
						type='text'
						name='company'
						value={company}
						handleChange={handleJobInput}
					/>

					<FormRow
						type='text'
						labelText='job location'
						name='jobLocation'
						value={jobLocation}
						handleChange={handleJobInput}
					/>
					
					{/* FormRowSelect components for status and jobType inputs */}
					<FormRowSelect
						name='status'
						value={status}
						handleChange={handleJobInput}
						list={statusOptions}
					/>

					<FormRowSelect
						name='jobType'
						labelText='job type'
						value={jobType}
						handleChange={handleJobInput}
						list={jobTypeOptions}
					/>
					
					{/* Container with submit and clear buttons */}
					<div className='btn-container'>
						<button
							type='submit'
							className='btn btn-block submit-btn'
							onClick={handleSubmit}
							disabled={isLoading}
						>
							submit
						</button>
						<button
							className='btn btn-block clear-btn'
							onClick={(e) => {
								e.preventDefault()
								clearValues()
							}}
						>
							clear
						</button>
					</div>
				</div>
			</form>
		</Wrapper>
	)
}

export default AddJob
