// Defining a function to attach a cookie to the response object
const attachCookie = ({ res, token }) => {
    // Calculating the duration of one month in milliseconds
    const oneMonth = 1000 * 60 * 60 * 24 * 30

    // Attaching the token as a cookie to the response object
    res.cookie('token', token, {
        httpOnly: true,
        // Setting the expiration date of the cookie to one month from now
        expires: new Date(Date.now() + oneMonth),
        // Setting the secure flag to true if the environment is production
        secure: process.env.NODE_ENV === 'production',
    })
}

export default attachCookie
