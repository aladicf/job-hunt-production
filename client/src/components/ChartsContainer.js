import React, { useState } from 'react'

import BarChart from './BarChart'
import AreaChart from './AreaChart'
import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/ChartsContainer'

// Define a functional component named ChartsContainer
const ChartsContainer = () => {
	// Declare a state variable named barChart and initialize it to true
	const [barChart, setBarChart] = useState(true)
	// Destructure monthlyApplications and rename it to data from the value returned by useAppContext hook
	const { monthlyApplications: data } = useAppContext()
	// Return a Wrapper component
	return (
		<Wrapper>
			{/* Render a h4 element with text */}
			<h4>Monthly Applications</h4>
			{/* Render a button element with an onClick handler that toggles the value of barChart */}
			<button type='button' onClick={() => setBarChart(!barChart)}>
				{/* Conditionally render the text of the button based on the value of barChart */}
				{barChart ? 'Area Chart' : 'Bar Chart'}
			</button>
			{/* Conditionally render either a BarChart or AreaChart component based on the value of barChart */}
			{barChart ? <BarChart data={data} /> : <AreaChart data={data} />}
		</Wrapper>
	)
}

export default ChartsContainer
