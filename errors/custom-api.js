// Define a CustomAPIError class that extends the built-in Error class
class CustomAPIError extends Error {
  // Define the class constructor
  constructor(message) {
    // Call the super constructor with the message parameter
    super(message)
  }
}

export default CustomAPIError
