import { useAppContext } from '../context/appContext'
import StatItem from './StatItem'
import { MdOutlinePendingActions } from 'react-icons/md'
import { FaRegCalendarCheck, FaWindowClose } from 'react-icons/fa'
import Wrapper from '../assets/wrappers/StatsContainer'

const StatsContainer = () => {
	const { stats } = useAppContext()

	const defaultStats = [
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
			{defaultStats.map((item, index) => {
				return <StatItem key={index} {...item} />
			})}
		</Wrapper>
	)
}

export default StatsContainer
