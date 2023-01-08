import { Link } from 'react-router-dom'
import img from '../assets/images/not-found.svg'
import Wrapper from '../assets/wrappers/ErrorPage'

const error = () => {
	return (
		<Wrapper className='full-page'>
			<div>
				<img src={img} alt='not found' />
				<h3>Page not found</h3>
				<p>Page you requested does not exist.</p>
				<Link to='/'>back home</Link>
			</div>
		</Wrapper>
	)
}

export default error
