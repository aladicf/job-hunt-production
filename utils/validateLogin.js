import { BadRequestError } from '../errors/index.js'

const validateLoginFields = (email, password,) => {
    if (!email || !password) {
        throw new BadRequestError('Please provide all values')
    }

    // Validate email format
    const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!emailRegex.test(email)) {
        throw new BadRequestError('Invalid email format')
    }
}

export default validateLoginFields
