import Wrapper from '../assets/wrappers/BigSidebar'
import { useAppContext } from '../context/appContext'
import NavLinks from './NavLinks'
import Logo from './Logo'

// Define a functional component named BigSidebar
const BigSidebar = () => {
	// Destructure showSidebar from the value returned by useAppContext hook
	const { showSidebar } = useAppContext()
	// Return a Wrapper component
	return (
		<Wrapper>
			{/* Render a div element with a className based on the value of showSidebar */}
			<div
				className={
					showSidebar ? 'sidebar-container' : 'sidebar-container show-sidebar'
				}
			>
				{/* Render a div element with a className of content */}
				<div className='content'>
					{/* Render a header element */}
					<header>
						{/* Render a Logo component */}
						<Logo />
					</header>
					{/* Render a NavLinks component */}
					<NavLinks />
				</div>
			</div>
		</Wrapper>
	)
}

export default BigSidebar
