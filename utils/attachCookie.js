const attachCookie = ({ res, token }) => {
	const oneMonth = 1000 * 60 * 60 * 24 * 30

	res.cookie('token', token, {
		httpOnly: true,
		expires: new Date(Date.now() + oneMonth),
		secure: process.env.NODE_ENV === 'production',
	})
}

export default attachCookie
