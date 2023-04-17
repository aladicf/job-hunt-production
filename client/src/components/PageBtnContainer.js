import { useAppContext } from '../context/appContext'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import Wrapper from '../assets/wrappers/PageBtnContainer'

// Define a functional component named PageBtnContainer
const PageBtnContainer = () => {
	// Destructure numOfPages, page and changePage from the value returned by useAppContext hook
	const { numOfPages, page, changePage } = useAppContext()

	// Declare a variable named pages and initialize it to an array of numbers from 1 to numOfPages
	const pages = Array.from({ length: numOfPages }, (_, index) => {
		return index + 1
	})
	// Declare a function named nextPage that increments the page number and calls changePage with the new page number
	const nextPage = () => {
		let newPage = page + 1
		if (newPage > numOfPages) {
			newPage = 1
		}
		changePage(newPage)
	}
	// Declare a function named prevPage that decrements the page number and calls changePage with the new page number
	const prevPage = () => {
		let newPage = page - 1
		if (newPage < 1) {
			newPage = numOfPages
		}
		changePage(newPage)
	}
	// Return a Wrapper component
	return (
		<Wrapper>
			{/* Render a button element with specified className and onClick props */}
			<button className='prev-btn' onClick={prevPage}>
				{/* Render a FaArrowLeft component */}
				<FaArrowLeft />
				prev
			</button>
			{/* Render a div element with a className of btn-container */}
			<div className='btn-container'>
				{/* Map over the pages array and render a button element for each page number */}
				{pages.map((pageNumber) => {
					return (
						<button
							type='button'
							className={pageNumber === page ? 'pageBtn active' : 'pageBtn'}
							key={pageNumber}
							onClick={() => changePage(pageNumber)}
						>
							{pageNumber}
						</button>
					)
				})}
			</div>
			{/* Render a button element with specified className and onClick props */}
			<button className='next-btn' onClick={nextPage}>
				next
				{/* Render a FaArrowRight component */}
				<FaArrowRight />
			</button>
		</Wrapper>

export default PageBtnContainer
