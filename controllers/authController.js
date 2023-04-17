import User from '../models/User.js'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, UnAuthenticatedError } from '../errors/index.js'
import attachCookie from '../utils/attachCookie.js'
import validateRegisterFields from '../utils/validateRegister.js'
import validateLoginFields from '../utils/validateLogin.js'
import validateUpdateFields from '../utils/validateUpdate.js'

// Define an asynchronous emailAlreadyInUse function that takes a userId and an email as parameters
const emailAlreadyInUse = async (userId, email) => {
  // Use the User.findOne method to find a user in the database with an email that matches the provided email (case-insensitive) and a different userId
  // The $regex operator is used to perform a case-insensitive match by specifying the 'i' option
  const user = await User.findOne({ _id: { $ne: userId }, email: { $regex: new RegExp(`^${email}$`, 'i') } })
  // Return true if a user is found and false otherwise
  // The !! operator is used to convert the user object to a boolean value
  return !!user
}

// Define an asynchronous register function that takes a request and response object as parameters
const register = async (req, res) => {
  // Extract the name, email, and password properties from the request body
  const { body: { name, email, password } } = req

  // Call the validateRegisterFields function to validate the provided values
  validateRegisterFields(name, email, password)

  // Call the emailAlreadyInUse function to check if the provided email is already in use by another user
  if (await emailAlreadyInUse(null, email)) {
    // If the email is already in use, throw a BadRequestError with a custom error message
    throw new BadRequestError('Email already in use')
  }
  // Use the User.create method to create a new user in the database with the provided data
  const user = await User.create({ name, email, password })

	// Call the createJWT method on the created user to generate a JSON Web Token (JWT)
  const token = user.createJWT()
  // Call the attachCookie function to attach the token to a cookie in the response
  attachCookie({ res, token })
  // Send a response with a status code of 201 (created) and an object containing the created user data in JSON format
  res.status(StatusCodes.CREATED).json({
    user: {
      email: user.email,
      lastName: user.lastName,
      location: user.location,
      name: user.name,
    },

    location: user.location,
  })
}

// Define an asynchronous function to handle login requests
const login = async (req, res) => {
    // Destructure email and password from the request body
    const { body: { email, password } } = req
    
    // Validate the email and password fields
    validateLoginFields(email, password)

    // Find a user with the provided email (case-insensitive)
    const user = await User.findOne({ email: { $regex: new RegExp(`^${email}$`, 'i') } }).select('+password')
    // If no user is found, throw an error
    if (!user) {
        throw new UnAuthenticatedError('Invalid Credentials')
    }

    // Compare the provided password with the user's stored password
    const isPasswordCorrect = await user.comparePassword(password)
    // If the password is incorrect, throw an error
    if (!isPasswordCorrect) {
        throw new UnAuthenticatedError('Invalid Credentials')
    }

    // Create a JSON Web Token for the user
    const token = user.createJWT()

    // Remove the password from the user object
    user.password = undefined
    // Attach the token to a cookie in the response
    attachCookie({ res, token })

    // Send a successful response with the user object and their location
    res.status(StatusCodes.OK).json({ user, location: user.location })
}

// Define an asynchronous function to handle update user requests
const updateUser = async (req, res) => {
    // Destructure email, name, lastName and location from the request body and userId from the request user object
    const { body: { email, name, lastName, location }, user: { userId } } = req

    // Validate the email, name, lastName and location fields
    validateUpdateFields(name, email, lastName, location )

    // Check if the provided email is already in use by another user
   if (await emailAlreadyInUse(userId, email)) {
        // If the email is already in use, throw an error
        throw new BadRequestError('Email already in use')
    }

    // Find the user with the provided userId
    const user = await User.findOne({ _id: userId })

    // Check if the user is only updating their own information
    if (userId !== req.user.userId) {
        // If not, throw an error
        throw new UnauthorizedError('You are not authorized to update this information')
    }

    // Update the user's information with the provided values
    user.email = email
    user.name = name
    user.lastName = lastName
    user.location = location

    // Save the updated user to the database
    await user.save()

    // Create a new JSON Web Token for the updated user
    const token = user.createJWT()
    // Attach the token to a cookie in the response
    attachCookie({ res, token })

    // Send a successful response with the updated user object and their location
    res.status(StatusCodes.OK).json({ user, location: user.location })
}

// Define an asynchronous function to handle get current user requests
const getCurrentUser = async (req, res) => {
    // Find the user with the userId from the request user object
    const user = await User.findOne({ _id: req.user.userId })
    // Send a successful response with the user object and their location
    res.status(StatusCodes.OK).json({ user, location: user.location })
}

// Define an asynchronous function to handle logout requests
const logout = async (req, res) => {
    // Set the token cookie to 'logout' and expire it immediately
    res.cookie('token', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now()),
    })
    // Send a successful response with a message
    res.status(StatusCodes.OK).json({ msg: 'User successfully logged out !' })
}

export { register, login, updateUser, getCurrentUser, logout }
