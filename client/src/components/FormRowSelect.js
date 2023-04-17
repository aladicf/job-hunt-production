
// Define a functional component named FormRowSelect that takes in several props
const FormRowSelect = ({ labelText, name, value, handleChange, list }) => {
	// Return a div element with a className of form-row
	return (
		<div className='form-row'>
			{/* Render a label element with specified htmlFor and className props and display either the value of labelText or name */}
			<label htmlFor={name} className='form-label'>
				{labelText || name}
			</label>
			{/* Render a select element with specified name, value, onChange and className props */}
			<select
				name={name}
				value={value}
				onChange={handleChange}
				className='form-select'
			>
				{/* Map over the list prop and render an option element for each item */}
				{list.map((jobType, index) => {
					return (
						<option key={index} value={jobType}>
							{jobType}
						</option>
					)
				})}
			</select>
		</div>
	)
}

export default FormRowSelect
