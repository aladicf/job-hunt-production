import { useAppContext } from '../context/appContext'

// Define a functional component named Alert
const Alert = () => {
  // Destructure alertType and alertText from the value returned by useAppContext hook
  const { alertType, alertText } = useAppContext()
  // Return a div element with a className based on the alertType and display the alertText
  return <div className={`alert alert-${alertType}`}>{alertText}</div>
}

export default Alert
