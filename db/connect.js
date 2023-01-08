import mongoose from 'mongoose'

const connectDB = async (url) => {
	return mongoose.connect(url, { dbName: 'jobhunt' })
}

export default connectDB
