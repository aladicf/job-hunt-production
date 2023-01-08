import { BadRequestError } from '../errors/index.js'

const testUser = (req, res, next) => {
	if (req.user.testUser) {
		throw new BadRequestError('Test user is read only mode for this page !')
	}
	next()
}

export default testUser
