import { FormRow, FormRowSelect } from '.'
import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/SearchContainer'
import { useState, useMemo } from 'react'

// Define a functional component called SearchContainer
const SearchContainer = () => {
	// Define a state variable called search and a function to update it called setSearch
	const [search, setSearch] = useState('')
	// Destructure values from the useAppContext hook
	const {
		isLoading,
		searchStatus,
		searchType,
		sort,
		sortOptions,
		handleChange,
		clearFilters,
		jobTypeOptions,
		statusOptions,
	} = useAppContext()

	// Define a function called handleSearch that takes an event as an argument
	const handleSearch = (e) => {
		// Call the handleChange function with an object containing the name and value of the event target
		handleChange({ name: e.target.name, value: e.target.value })
	}

	// Define a function called handleSubmit that takes an event as an argument
	const handleSubmit = (e) => {
		e.preventDefault() // Prevent the default form submission behavior
		setSearch('') // Reset the search state variable to an empty string
		clearFilters() // Call the clearFilters function
	}

	// Define a function called debounce
	const debounce = () => {
		let timeoutID // Declare a variable called timeoutID
		return (e) => { // Return a function that takes an event as an argument
			setSearch(e.target.value) // Update the search state variable with the value of the event target
			clearTimeout(timeoutID) // Clear any existing timeout
			timeoutID = setTimeout(() => { // Set a new timeout and assign its ID to the timeoutID variable
				handleChange({ name: e.target.name, value: e.target.value }) // Call the handleChange function with an object containing the name and value of the event target after 1 second (1000 milliseconds)
			}, 1000)
		}
	}

	// Use useMemo to create a memoized version of the debounce function called optimizedDebounce
	// eslint-disable-next-line
	const optimizedDebounce = useMemo(() => debounce(), [])

	return (
		<Wrapper>
			<form className='form'>
				<h4>search form</h4>
				<div className='form-center'>
					{/* Add a FormRow component for searching by position */}

					<FormRow
						type='text'
						name='search'
						value={search}
						handleChange={optimizedDebounce}
					/>
					{/* Add a FormRowSelect component for searching by status */}
					<FormRowSelect
						labelText='status'
						name='searchStatus'
						value={searchStatus}
						handleChange={handleSearch}
						list={['all', ...statusOptions]}
					/>
					{/* Add a FormRowSelect component for searching by type */}
					<FormRowSelect
						labelText='type'
						name='searchType'
						value={searchType}
						handleChange={handleSearch}
						list={['all', ...jobTypeOptions]}
					/>
					{/* Add a FormRowSelect component for sorting results */}
					<FormRowSelect
						name='sort'
						value={sort}
						handleChange={handleSearch}
						list={sortOptions}
					/>
					<button
						className='btn btn-block btn-danger'
						disabled={isLoading}
						onClick={handleSubmit}
					>
						clear filters
					</button>
				</div>
			</form>
		</Wrapper>
	)
}

export default SearchContainer
