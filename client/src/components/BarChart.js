import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from 'recharts'

// Define a functional component named BarChartComponent that takes in a prop named data
const BarChartComponent = ({ data }) => {
	// Return a ResponsiveContainer component with a specified width and height
	return (
		<ResponsiveContainer width='100%' height={300}>
			{/* Render a BarChart component with the data prop passed in */}
			<BarChart data={data} margin={{ top: 50 }}>
				{/* Add a CartesianGrid to the chart with a specified strokeDasharray */}
				<CartesianGrid strokeDasharray='3 3 ' />
				{/* Add an XAxis to the chart with a specified dataKey */}
				<XAxis dataKey='date' />
				{/* Add a YAxis to the chart that does not allow decimals */}
				<YAxis allowDecimals={false} />
				{/* Add a Tooltip to the chart with specified cursor properties */}
				<Tooltip
					cursor={{ stroke: '#5eead4', fill: '#99f6e4', strokeWidth: 2 }}
				/>
				{/* Add a Bar to the chart with specified dataKey, fill and barSize */}
				<Bar dataKey='count' fill='#14b8a6' barSize={80} />
			</BarChart>
		</ResponsiveContainer>
	)
}

export default BarChartComponent
