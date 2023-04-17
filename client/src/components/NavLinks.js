import links from '../utils/links'
import { NavLink } from 'react-router-dom'

// Define a functional component named NavLinks that takes in a prop named toggleSidebar
const NavLinks = ({ toggleSidebar }) => {
	// Return a div element with a className of nav-links
	return (
		<div className='nav-links'>
			{/* Map over the links array and render a NavLink component for each link */}
			{links.map((link) => {
				const { text, path, id, icon } = link
				return (
					<NavLink
						to={path}
						key={id}
						onClick={toggleSidebar}
						className={({ isActive }) =>
							isActive ? 'nav-link active' : 'nav-link'
						}
						end
					>
						{/* Render a span element with a className of icon and display the value of icon */}
						<span className='icon'>{icon}</span>
						{/* Display the value of text */}
						{text}
					</NavLink>
				)
			})}
		</div>
	)
}

export default NavLinks
