import { UnAuthenticatedError } from '../errors/index.js'

// Defining a function to check if the user has permission to access a resource
const checkPermissions = (requestUser, resourceUserId) => {
    // Checking if the user making the request is the same as the user who owns the resource
    if (requestUser.userId === resourceUserId.toString()) return

    // Throwing an error if the user is not authorized to access the resource
    throw new UnAuthenticatedError('Not authorized to access this route')
}

export default checkPermissions
