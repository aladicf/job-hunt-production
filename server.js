import 'express-async-errors' // Handle asynchronous errors in Express middleware
import express from 'express' // Express.js web framework
import dotenv from 'dotenv' // Load environment variables from .env file
import cookieParser from 'cookie-parser' // Parse cookies from request headers
import morgan from 'morgan' // HTTP request logger
import helmet from 'helmet' // Set secure HTTP headers
import xss from 'xss-clean' // Sanitize user input to prevent XSS attacks
import mongoSanitize from 'express-mongo-sanitize' // Sanitize user input to prevent NoSQL injection attacks
import { dirname } from 'path' // Get the directory name of the current module
import { fileURLToPath } from 'url' // Convert a file URL to a file path
import path from 'path' // Utilities for working with file paths

// Create an Express.js app instance
const app = express()

// Load environment variables from .env file
dotenv.config()

// Import the connectDB function to connect to the MongoDB database using Mongoose
import connectDB from './db/connect.js'

// Import route handlers for authentication and job-related operations
import authRoutes from './routes/authRoutes.js'
import jobsRoutes from './routes/jobsRoutes.js'

// Import custom middleware functions for handling 404 errors and error responses
import notFoundMiddleware from './middleware/not-found.js'
import errorHandlerMiddleware from './middleware/error-handler.js'
// Import custom middleware function for authenticating users
import authenticateUser from './middleware/auth.js'

// Use the morgan middleware for logging HTTP requests in development mode
if (process.env.NODE_ENV !== 'production') {
	app.use(morgan('dev'))
}

// Get the directory name of the current module
const __dirname = dirname(fileURLToPath(import.meta.url))

// Serve static files from the ./client/build directory in production mode
app.use(express.static(path.resolve(__dirname, './client/build')))

// Use middleware to parse JSON request bodies, cookies, set secure HTTP headers, sanitize user input, and prevent XSS and NoSQL injection attacks
app.use(express.json())
app.use(cookieParser())
app.use(helmet())
app.use(xss())
app.use(mongoSanitize())

// Define a route handler for the root path that returns a welcome message in JSON format
app.get('/api/v1', (req, res) => {
	res.json({ msg: 'Welcome to the Job Hunt' })
})

// Use the imported route handlers for authentication and job-related operations
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/jobs', authenticateUser, jobsRoutes)

// Serve the index.html file for all other requests in production mode
app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, './client/build', 'index.html'))
})

// Use custom middleware functions for handling 404 errors and error responses
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

// Get the port number from environment variables or use 5000 as a default value
const port = process.env.PORT || 5000

// Define an asynchronous start function to connect to the MongoDB database and start listening on the specified port
const start = async () => {
	try {
		// Connect to the MongoDB database using Mongoose and the connection URL specified in environment variables
		await connectDB(process.env.MONGO_URL)

		// Start listening on the specified port and log a message to the console when ready
		app.listen(port, () => {
			console.log(`Server listening on port ${port}...`)
		})
	} catch (error) {
		// Log any errors that occur while connecting to the database or starting the server
		console.log(error)
	}
}

// Call the start function to connect to the database and start the server
start()
