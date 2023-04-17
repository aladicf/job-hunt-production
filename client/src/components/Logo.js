import logo from '../assets/images/logo.svg'

// Define a functional component named Logo
const Logo = () => {
	// Return an img element with specified src, alt, className, weight and height props
	return (
		<img src={logo} alt='job hunt' className='logo' weight={200} height={200} />
	)
}

export default Logo
