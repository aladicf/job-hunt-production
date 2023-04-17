import { useEffect } from 'react'
import { useAppContext } from '../../context/appContext'
import { StatsContainer, Loading, ChartsContainer } from '../../components'

// Define Stats component
const Stats = () => {
	// Get showStats, isLoading, and monthlyApplications values from app context
	const { showStats, isLoading, monthlyApplications } = useAppContext()

	// Call showStats function when component mounts
	useEffect(() => {
		showStats()
		// eslint-disable-next-line
	}, [])
	// If isLoading is true, render Loading component
	if (isLoading) {
		return <Loading center />
	}
	return (
		<>
			{/* Render StatsContainer component */}
			<StatsContainer />
			{/* Conditional rendering of ChartsContainer component */}
			{monthlyApplications.length > 0 && <ChartsContainer />}
		</>
	)
}

export default Stats
