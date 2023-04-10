import User from '../models/User.js'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, UnAuthenticatedError } from '../errors/index.js'
import attachCookie from '../utils/attachCookie.js'
import validateRegisterFields from '../utils/validateRegister.js'
import validateLoginFields from '../utils/validateLogin.js'
import validateUpdateFields from '../utils/validateUpdate.js'

const emailAlreadyInUse = async (userId, email) => {
    const user = await User.findOne({ _id: { $ne: userId }, email: { $regex: new RegExp(`^${email}$`, 'i') } })
    return !!user
}

const register = async (req, res) => {
    const { body: { name, email, password } } = req

    validateRegisterFields(name, email, password)

    if (await emailAlreadyInUse(null, email)) {
    throw new BadRequestError('Email already in use')
}

    const user = await User.create({ name, email, password })

	const token = user.createJWT()
	attachCookie({ res, token })
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

const login = async (req, res) => {
    const { body: { email, password } } = req
    
    validateLoginFields(email, password)

    const user = await User.findOne({ email: { $regex: new RegExp(`^${email}$`, 'i') } }).select('+password')
    if (!user) {
        throw new UnAuthenticatedError('Invalid Credentials')
    }

    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
        throw new UnAuthenticatedError('Invalid Credentials')
    }

    const token = user.createJWT()

    user.password = undefined
    attachCookie({ res, token })

    res.status(StatusCodes.OK).json({ user, location: user.location })
}

const updateUser = async (req, res) => {
	
    const { body: { email, name, lastName, location }, user: { userId } } = req

    validateUpdateFields(name, email, lastName, location )

    if (await emailAlreadyInUse(userId, email)) {
        throw new BadRequestError('Email already in use')
    }

    const user = await User.findOne({ _id: userId })

    // Check if the user is only updating their own information
    if (userId !== req.user.userId) {
        throw new UnauthorizedError('You are not authorized to update this information')
    }

    user.email = email
    user.name = name
    user.lastName = lastName
    user.location = location

    await user.save()

    const token = user.createJWT()
    attachCookie({ res, token })

    res.status(StatusCodes.OK).json({ user, location: user.location })
}

const getCurrentUser = async (req, res) => {
	const user = await User.findOne({ _id: req.user.userId })
	res.status(StatusCodes.OK).json({ user, location: user.location })
}

const logout = async (req, res) => {
	res.cookie('token', 'logout', {
		httpOnly: true,
		expires: new Date(Date.now()),
	})
	res.status(StatusCodes.OK).json({ msg: 'User successfully logged out !' })
}

export { register, login, updateUser, getCurrentUser, logout }
