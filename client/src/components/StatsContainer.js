import { useAppContext } from '../context/appContext'
import StatItem from './StatItem'
import { MdOutlinePendingActions } from 'react-icons/md'
import { FaRegCalendarCheck, FaWindowClose } from 'react-icons/fa'
import Wrapper from '../assets/wrappers/StatsContainer'

// Define a functional component called StatsContainer
const StatsContainer = () => {
	// Destructure values from the useAppContext hook
	const { stats } = useAppContext()

	// Define an array of objects called defaultStats
		{
			title: 'pending applications',
			count: stats.pending || 0,
			icon: <MdOutlinePendingActions />,
			color: '#fbbf24',
			bcg: '#fef3c7',
		},
		{
			title: 'interviews scheduled',
			count: stats.interview || 0,
			icon: <FaRegCalendarCheck />,
			color: '#4f46e5',
			bcg: '#e0e7ff',
		},
		{
			title: 'jobs declined',
			count: stats.declined || 0,
			icon: <FaWindowClose />,
			color: '#dc2626',
			bcg: '#fee2e2',
		},
	]

	return (
		<Wrapper>
			{/* Map over defaultStats array and for each item return a StatItem component with props spread from item object and key set to index */ }
			{defaultStats.map((item, index) => {
				return <StatItem key={index} {...item} />
			})}
		</Wrapper>
	)
}

export default StatsContainer
