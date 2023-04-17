import Wrapper from '../assets/wrappers/StatItem'

// Define a functional component called StatsItem that takes props count, title, icon, color and bcg
const StatsItem = ({ count, title, icon, color, bcg }) => {
	return (
		{/* Return a Wrapper component and pass color and bcg props */ }
		<Wrapper color={color} bcg={bcg}>
			<header>
				<span className='count'>{count}</span>
				<span className='icon'>{icon}</span>
			</header>
			<h5 className='title'>{title}</h5>
		</Wrapper>
	)
}

export default StatsItem
