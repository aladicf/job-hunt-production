import { FormRow, FormRowSelect } from '.'
import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/SearchContainer'
import { useState, useMemo } from 'react'
const SearchContainer = () => {
	const [search, setSearch] = useState('')
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

	const handleSearch = (e) => {
		handleChange({ name: e.target.name, value: e.target.value })
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		setSearch('')
		clearFilters()
	}

	const debounce = () => {
		let timeoutID
		return (e) => {
			setSearch(e.target.value)
			clearTimeout(timeoutID)
			timeoutID = setTimeout(() => {
				handleChange({ name: e.target.name, value: e.target.value })
			}, 1000)
		}
	}

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const optimizedDebounce = useMemo(() => debounce(), [])

	return (
		<Wrapper>
			<form className='form'>
				<h4>search form</h4>
				<div className='form-center'>
					{/* search position */}

					<FormRow
						type='text'
						name='search'
						value={search}
						handleChange={optimizedDebounce}
					/>
					{/* search by status */}
					<FormRowSelect
						labelText='status'
						name='searchStatus'
						value={searchStatus}
						handleChange={handleSearch}
						list={['all', ...statusOptions]}
					/>
					{/* search by type */}
					<FormRowSelect
						labelText='type'
						name='searchType'
						value={searchType}
						handleChange={handleSearch}
						list={['all', ...jobTypeOptions]}
					/>
					{/* sort */}
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
