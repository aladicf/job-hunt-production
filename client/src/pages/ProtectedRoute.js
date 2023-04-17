import { useAppContext } from '../context/appContext'
import { Navigate } from 'react-router-dom'
import Loading from '../components/Loading'

// Define ProtectedRoute component
const ProtectedRoute = ({ children }) => {
	// Get user and userLoading values from app context
	const { user, userLoading } = useAppContext()

	// If userLoading is true, render Loading component
	if (userLoading)
		return (
			<div>
				<Loading center />
			</div>
		)
	if (!user) {
		return <Navigate to='/landing' />
	}
	return children
}

export default ProtectedRoute
