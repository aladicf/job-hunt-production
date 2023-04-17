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

	// If user is not defined, redirect to /landing route
	if (!user) {
		return <Navigate to='/landing' />
	}
	// If user is defined, render children
	return children
}

export default ProtectedRoute
