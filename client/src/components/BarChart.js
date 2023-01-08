import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from 'recharts'

const BarChartComponent = ({ data }) => {
	return (
		<ResponsiveContainer width='100%' height={300}>
			<BarChart data={data} margin={{ top: 50 }}>
				<CartesianGrid strokeDasharray='3 3 ' />
				<XAxis dataKey='date' />
				<YAxis allowDecimals={false} />
				<Tooltip
					cursor={{ stroke: '#5eead4', fill: '#99f6e4', strokeWidth: 2 }}
				/>
				<Bar dataKey='count' fill='#14b8a6' barSize={80} />
			</BarChart>
		</ResponsiveContainer>
	)
}

export default BarChartComponent
