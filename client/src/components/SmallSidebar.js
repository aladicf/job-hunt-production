import Wrapper from '../assets/wrappers/SmallSidebar'
import { FaTimes } from 'react-icons/fa'
import { useAppContext } from '../context/appContext'
import NavLinks from './NavLinks'
import Logo from './Logo'

// Define a functional component called SmallSidebar
const SmallSidebar = () => {
	// Destructure values from the useAppContext hook
	const { showSidebar, toggleSidebar } = useAppContext()

	return (
		<Wrapper>
			// Define a div element with a class of 'sidebar-container' and an additional class of 'show-sidebar' if showSidebar is true
			<div
				className={
					showSidebar ? 'sidebar-container show-sidebar' : 'sidebar-container'
				}
			>
				<div className='content'>
					<button type='button' className='close-btn' onClick={toggleSidebar}>
						<FaTimes />
					</button>
					<header>
						<Logo />
					</header>
					<NavLinks toggleSidebar={toggleSidebar} />
				</div>
			</div>
		</Wrapper>
	)
}

export default SmallSidebar
