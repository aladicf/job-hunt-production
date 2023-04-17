import { useState } from 'react'
import { FormRow, Alert } from '../../components'
import { useAppContext } from '../../context/appContext'
import Wrapper from '../../assets/wrappers/DashboardFormPage'

const Profile = () => {

	// Get user, showAlert, displayAlert, updateUser, and isLoading values from app context
	const { user, showAlert, displayAlert, updateUser, isLoading } =
		useAppContext()

	// Define state variables for name, email, lastName, and location
	const [name, setName] = useState(user?.name)
	const [email, setEmail] = useState(user?.email)
	const [lastName, setLastName] = useState(user?.lastName)
	const [location, setLocation] = useState(user?.location)

	// Define handleSubmit function
	const handleSubmit = (e) => {
		// Prevent default form submission behavior
		e.preventDefault()
		// Check if name, email, lastName, and location values are defined
		if (!name || !email || !lastName || !location) {
			// Call displayAlert function
			displayAlert()
			return
		}
		// Call updateUser function with updated user information
		updateUser({ name, email, lastName, location })
	}

	return (
		<Wrapper>
			<form className='form' onSubmit={handleSubmit}>
				<h3>profile</h3>
				{/* Conditional rendering of Alert component */}
				{showAlert && <Alert />}
				<div className='form-center'>
					{/* FormRow components for name, lastName, email, and location inputs */}
					<FormRow
						type='text'
						name='name'
						value={name}
						handleChange={(e) => setName(e.target.value)}
					/>
					<FormRow
						type='text'
						labelText={'Last Name'}
						name='lastName'
						value={lastName}
						handleChange={(e) => setLastName(e.target.value)}
					/>
					<FormRow
						type='email'
						name='email'
						value={email}
						handleChange={(e) => setEmail(e.target.value)}
					/>
					<FormRow
						type='text'
						name='location'
						value={location}
						handleChange={(e) => setLocation(e.target.value)}
					/>
					<button className='btn btn-block' type='submit' disabled={isLoading}>
					{/* Display "Please Wait..." if isLoading is true, otherwise display "Save changes" */}
						{isLoading ? 'Please Wait...' : 'Save changes'}
					</button>
				</div>
			</form>
		</Wrapper>
	)
}

export default Profile
