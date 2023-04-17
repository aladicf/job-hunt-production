import main from '../assets/images/main.svg'
import Wrapper from '../assets/wrappers/LandingPage'
import { Logo } from '../components'
import { Link } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import { useAppContext } from '../context/appContext'
import React from 'react'

const Landing = () => {
	const { user } = useAppContext()
	return (
		<React.Fragment>
			{/* If user is defined, redirect to root route */}
			{user && <Navigate to='/' />}
			<Wrapper>
				<nav>
					<Logo />
				</nav>
				<div className='container page'>
					<div className='info'>
						<h1>
							job <span>tracking</span> app
						</h1>
						<p>Simplify your job search with this free to use app.</p>
						<Link to='/register' className='btn btn-hero'>
							Login / Register
						</Link>
					</div>
					<img src={main} alt='job hunt' className='img main-img' />
				</div>
			</Wrapper>
		</React.Fragment>
	)
}

export default Landing
