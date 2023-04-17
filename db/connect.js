import mongoose from 'mongoose'

// Define an asynchronous function to connect to a MongoDB database using Mongoose
const connectDB = async (url) => {
  // Connect to the MongoDB database at the specified URL and specify the database name in the connection options
  return mongoose.connect(url, { dbName: 'jobhunt' })
}

export default connectDB
