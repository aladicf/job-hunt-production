import { useState, useEffect } from 'react'
import { Logo, FormRow, Alert } from '../components'
import Wrapper from '../assets/wrappers/RegisterPage'
import { useAppContext } from '../context/appContext'
import { useNavigate } from 'react-router-dom'

const initialState = {
	name: '',
	email: '',
	password: '',
	isMember: true,
}

const Register = () => {
	const navigate = useNavigate()
	// Define a state variable called values and a function to update it called setValues
// The initial value of values is set to initialState
const [values, setValues] = useState(initialState)

// Destructure the user, isLoading, showAlert, displayAlert and setupUser properties from the useAppContext hook
const { user, isLoading, showAlert, displayAlert, setupUser } = useAppContext()

// Define a function called toggleMember that updates the isMember property of the values state variable
const toggleMember = () => {
	// Use the setValues function to update the values state variable
	// Spread the current values of the values state variable and update the isMember property to its opposite value
	setValues({ ...values, isMember: !values.isMember })
}

	// Define a function called handleChange that takes an event object as an argument
const handleChange = (e) => {
	// Use the setValues function to update the values state variable
	// Spread the current values of the values state variable and update the property with the name attribute of the event target to its value
	setValues({ ...values, [e.target.name]: e.target.value })
}

	// Define a function called onSubmit that takes an event object as an argument
const onSubmit = (e) => {
	// Prevent the default behavior of the event
	e.preventDefault()

	// Destructure the name, email, password and isMember properties from the values state variable
	const { name, email, password, isMember } = values

	// Check if the email or password properties are empty or if the user is not a member and the name property is empty
	if (!email || !password || (!isMember && !name)) {
		// Call the displayAlert function to show an alert
		displayAlert()
		return
	}

	// Define an object called currentUser with the name, email and password properties from the values state variable
	const currentUser = { name, email, password }

	// Check if the user is a member
	if (isMember) {
		// Call the setupUser function with an object containing the currentUser object, an endPoint property set to 'login' and an alertText property set to 'Login Successful! Redirecting...'
		setupUser({
			currentUser,
			endPoint: 'login',
			alertText: 'Login Successful! Redirecting...',
		})
	} else {
		// Call the setupUser function with an object containing the currentUser object, an endPoint property set to 'register' and an alertText property set to 'User Created! Redirecting...'
		setupUser({
			currentUser,
			endPoint: 'register',
			alertText: 'User Created! Redirecting...',
		})
	}
}

	useEffect(() => {
		if (user) {
	// This condition checks if the 'user' variable exists and is truthy (not null, undefined, false, 0, empty string)
    	// If the 'user' is truthy, it indicates that the user is logged in or has a valid user object
			navigate('/')
	//Navigating to the root route ('/') if the 'user' is logged in or has a valid user object
		}
	}, [user, navigate])
	// The array of dependencies is specified as [user, navigate], which means the effect will only run if either 'user' or 'navigate' changes

	return (
		<Wrapper className='full-page'>
		{/* Form element with onSubmit event handler */}
		<form className='form' onSubmit={onSubmit}>
			{/* Logo component */}
			<Logo />
			{/* Heading displaying either "Login" or "Register" */}
			<h3>{values.isMember ? 'Login' : 'Register'}</h3>
			{/* Conditional rendering of Alert component */}
			{showAlert && <Alert />}
			{/* Conditional rendering of name input for registration */}
			{!values.isMember && (
				<FormRow
					type='text'
					name='name'
					value={values.name}
					handleChange={handleChange}
				/>
			)}
				{/* email input */}
				<FormRow
					type='email'
					name='email'
					value={values.email}
					handleChange={handleChange}
				/>
				{/* password input */}
				<FormRow
					type='password'
					name='password'
					value={values.password}
					handleChange={handleChange}
				/>
				<button type='submit' className='btn btn-block' disabled={isLoading}>
					submit
				</button>
				{/* Button for testing app */}
				<button
					type='button'
					className='btn btn-block btn-test-app'
					disabled={isLoading}
					onClick={() => {
						// Call setupUser function with test user information
						setupUser({
							currentUser: { email: 'test@user.com', password: '1234567890' },
							endPoint: 'login',
							alertText: 'Login Successful! Redirecting...',
						})
					}}
				>
					{/* Display "loading..." if isLoading is true, otherwise display "Test This App" */}
					{isLoading ? 'loading...' : 'Test This App'}
				</button>
				<p>
					{/* Display either "Not a member yet?" or "Already a member?" */}
					{values.isMember ? 'Not a member yet ?' : 'Already a member?'}
					{/* Button for toggling between login and registration */}
					<button type='button' onClick={toggleMember} className='member-btn'>
						{/* Display either "Register" or "Login" */}
						{values.isMember ? 'Register' : 'Login'}
					</button>
				</p>
			</form>
		</Wrapper>
	)
}
export default Register
