import { FaChartBar } from 'react-icons/fa'
import { FaRegListAlt } from 'react-icons/fa'
import { FaRegPlusSquare } from 'react-icons/fa'
import { FaUserCog } from 'react-icons/fa'

const links = [
	{
		id: 1,
		text: 'stats',
		path: '/',
		icon: <FaChartBar />,
	},
	{
		id: 2,
		text: 'all jobs',
		path: 'all-jobs',
		icon: <FaRegListAlt />,
	},
	{
		id: 3,
		text: 'add job',
		path: 'add-job',
		icon: <FaRegPlusSquare />,
	},
	{
		id: 4,
		text: 'profile',
		path: 'profile',
		icon: <FaUserCog />,
	},
]

export default links
