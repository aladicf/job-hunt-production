import { FaChartBar } from 'react-icons/fa'
import { FaRegListAlt } from 'react-icons/fa'
import { FaRegPlusSquare } from 'react-icons/fa'
import { FaUserCog } from 'react-icons/fa'

// Define an array of objects named links
const links = [
    // Each object in the array represents a link
    {
        // The id property is a unique identifier for the link
        id: 1,
        // The text property is the text that will be displayed for the link
        text: 'stats',
        // The path property is the URL path that the link will navigate to when clicked
        path: '/',
        // The icon property is a React element that will be rendered as the link's icon
        icon: <FaChartBar />,
    },
    // Additional link objects with similar properties
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
