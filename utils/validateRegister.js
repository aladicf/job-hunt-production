import { BadRequestError } from '../errors/index.js'

const validateRegisterFields = (name, email, password,) => {
    if (!name || !email || !password) {
        throw new BadRequestError('Please provide all values')
    }

    // Validate email format
    const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!emailRegex.test(email)) {
        throw new BadRequestError('Invalid email format')
    }

    if (password.length < 8) {
        throw new BadRequestError('Password must be at least 8 characters')
    }
}

export default validateRegisterFields
