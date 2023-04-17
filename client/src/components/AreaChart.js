import {
	ResponsiveContainer,
	AreaChart,
	Area,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
} from 'recharts'

// Define a functional component named AreaChartComponent that takes in a prop named data
const AreaChartComponent = ({ data }) => {
	// Return a ResponsiveContainer component with a specified width and height
	return (
		<ResponsiveContainer width='100%' height={300}>
			{/* Render an AreaChart component with the data prop passed in */}
			<AreaChart data={data} margin={{ top: 50 }}>
				{/* Add a CartesianGrid to the chart with a specified strokeDasharray */}
				<CartesianGrid strokeDasharray='3 3' />
				{/* Add an XAxis to the chart with a specified dataKey */}
				<XAxis dataKey='date' />
				{/* Add a YAxis to the chart that does not allow decimals */}
				<YAxis allowDecimals={false} />
				{/* Add a Tooltip to the chart */}
				<Tooltip />
				{/* Add an Area to the chart with specified type, dataKey, stroke and fill */}
				<Area type='monotone' dataKey='count' stroke='#14b8a6' fill='#99f6e4' />
			</AreaChart>
		</ResponsiveContainer>
	)
}

export default AreaChartComponent
