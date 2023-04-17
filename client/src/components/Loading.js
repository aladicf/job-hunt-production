
// Define a functional component named Loading that takes in a prop named center
const Loading = ({ center }) => {
	// Return a div element with a className based on the value of center
	return <div className={center ? 'loading loading-center' : 'loading'}></div>
}

export default Loading
