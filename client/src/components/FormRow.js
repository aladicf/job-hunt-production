
// Define a functional component named FormRow that takes in several props
const FormRow = ({ type, name, value, handleChange, labelText }) => {
	// Return a div element with a className of form-row
	return (
		<div className='form-row'>
			{/* Render a label element with specified htmlFor and className props and display either the value of labelText or name */}
			<label htmlFor={name} className='form-label'>
				{labelText || name}
			</label>
			{/* Render an input element with specified type, value, name, onChange and className props */}
			<input
				type={type}
				value={value}
				name={name}
				onChange={handleChange}
				className='form-input'
			/>
		</div>
	)
}

export default FormRow
