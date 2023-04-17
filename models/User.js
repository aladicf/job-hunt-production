import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Please provide a name'],
		minlength: 3,
		maxlength: 20,
		trim: true,
	},
	email: {
		type: String,
		required: [true, 'Please provide an email'],
		validate: {
			validator: validator.isEmail,
			message: 'Please provide a valid email',
		},
		unique: true,
	},
	password: {
		type: String,
		required: [true, 'Please provide a password'],
		minlength: 8,
		select: false,
	},
	lastName: {
		type: String,
		trim: true,
		maxlength: 20,
		default: 'Last Name',
	},
	location: {
		type: String,
		trim: true,
		maxlength: 25,
		default: 'World',
	},
})

// Defining a pre-save hook for the UserSchema
UserSchema.pre('save', async function () {
    // Checking if the password field has been modified
    if (!this.isModified('password')) return

    // Generating a salt for hashing the password
    const salt = await bcrypt.genSalt(10)

    // Hashing the password using the generated salt
    this.password = await bcrypt.hash(this.password, salt)
})

// Defining a method to create a JSON Web Token (JWT) for a user
UserSchema.methods.createJWT = function () {
    // Signing the JWT with the user's id and the secret key
    return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
        // Setting the expiration time of the JWT
        expiresIn: process.env.JWT_LIFETIME,
    })
}

// Defining a method to compare a candidate password with the user's password
UserSchema.methods.comparePassword = async function (candidatePassword) {
    // Comparing the candidate password with the user's password using bcrypt
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch
}

export default mongoose.model('User', UserSchema)
