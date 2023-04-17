import Wrapper from '../assets/wrappers/JobInfo'

// Define a functional component named JobInfo that takes in two props
const JobInfo = ({ icon, text }) => {
	// Return a Wrapper component
	return (
		<Wrapper>
			{/* Render a span element with a className of icon and display the value of icon */}
			<span className='icon'>{icon}</span>
			{/* Render a span element with a className of text and display the value of text */}
			<span className='text'>{text}</span>
		</Wrapper>
	)
}

export default JobInfo
