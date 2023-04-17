import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Register, Landing, Error, ProtectedRoute } from './pages'
import {
	AllJobs,
	Profile,
	SharedLayout,
	Stats,
	AddJob,
} from './pages/dashboard'

function App() {
	// Return JSX that renders a BrowserRouter component
    return (
        <BrowserRouter>
            {/* Within the BrowserRouter, render a Routes component */}
            <Routes>
                {/* Define a Route for the root path */}
                <Route
                    path='/'
                    element={
                        // Use a ProtectedRoute component to only allow access to authenticated users
                        <ProtectedRoute>
                            {/* Render a SharedLayout component within the ProtectedRoute */}
                            <SharedLayout />
                        </ProtectedRoute>
                    }
                >
                    {/* Define nested Routes within the root Route */}
                    {/* The index Route renders a Stats component */}
                    <Route index element={<Stats />} />
                    {/* The 'all-jobs' Route renders an AllJobs component */}
                    <Route path='all-jobs' element={<AllJobs />} />
                    {/* The 'add-job' Route renders an AddJob component */}
                    <Route path='add-job' element={<AddJob />} />
                    {/* The 'profile' Route renders a Profile component */}
                    <Route path='profile' element={<Profile />} />
                </Route>
                {/* Define a Route for the '/register' path that renders a Register component */}
                <Route path='/register' element={<Register />} />
                {/* Define a Route for the '/landing' path that renders a Landing component */}
                <Route path='/landing' element={<Landing />} />
                {/* Define a catch-all Route that renders an Error component for any undefined paths */}
                <Route path='*' element={<Error />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
