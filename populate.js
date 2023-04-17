import { readFile } from 'fs/promises'

import dotenv from 'dotenv'
dotenv.config()

import connectDB from './db/connect.js'
import Job from './models/Job.js'

// Define an asynchronous start function
const start = async () => {
  try {
    // Connect to the MongoDB database using Mongoose and the connection URL specified in environment variables
    await connectDB(process.env.MONGO_URL)

    // Read data from the mock-data.json file and parse it as JSON
    const jsonProducts = JSON.parse(
      await readFile(new URL('./mock-data.json', import.meta.url))
    )

    // Create new Job documents in the database using the parsed data
    await Job.create(jsonProducts)

    // Log a success message and exit the process with a status code of 0
    console.log('Success!!!')
    process.exit(0)
  } catch (error) {
    // If an error occurs, log it and exit the process with a status code of 1
    console.log(error)
    process.exit(1)
  }
}

// Call the start function to connect to the database and create new Job documents
start()
