import { useState } from 'react'
import Wrapper from '../assets/wrappers/Navbar'
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa'
import { useAppContext } from '../context/appContext'
import Logo from '../components/Logo'

// Define a functional component named Navbar
const Navbar = () => {
	// Destructure user, logoutUser and toggleSidebar from the value returned by useAppContext hook
	const { user, logoutUser, toggleSidebar } = useAppContext()
	// Declare a state variable named showDropdown and initialize it to false
	const [showDropdown, setShowDropdown] = useState(false)

	// Return a Wrapper component
	return (
		<Wrapper>
			{/* Render a div element with a className of nav-center */}
			<div className='nav-center'>
				{/* Render a button element with specified type, className and onClick props */}
				<button type='button' className='toggle-btn' onClick={toggleSidebar}>
					{/* Render a FaAlignLeft component */}
					<FaAlignLeft />
				</button>
				{/* Render a div element */}
				<div>
					{/* Render a Logo component */}
					<Logo />
					{/* Render a h3 element with a className of logo-text and display the text 'Dashboard' */}
					<h3 className='logo-text'>Dashboard</h3>
				</div>
				{/* Render a div element with a className of btn-container */}
				<div className='btn-container'>
					{/* Render a button element with specified type, className and onClick props */}
					<button
						type='button'
						className='btn'
						onClick={() => setShowDropdown(!showDropdown)}
					>
						{/* Render a FaUserCircle component */}
						<FaUserCircle />
						{/* Display the name property of user if it exists */}
						{user?.name}
						{/* Render a FaCaretDown component */}
						<FaCaretDown />
					</button>
					{/* Render a div element with a dynamic className based on the value of showDropdown */}
					<div className={showDropdown ? 'dropdown show-dropdown' : 'dropdown'}>
						{/* Render a button element with specified type, className and onClick props */}
						<button type='button' className='dropdown-btn' onClick={logoutUser}>
							Logout
						</button>
					</div>
				</div>
			</div>
		</Wrapper>
	)
}

export default Navbar
