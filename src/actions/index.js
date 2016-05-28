import axios from 'axios';

const API_URL = 'http://localhost:3147';

export function signinUser({ email, password }) {
  // Usually we return an object with props, NOT!! with 'redux-thunk'
  // this function that is returned is what gives us direct access to the dispatch method
  return funtion(dispatch) {
  // Submit email/password to the server

  // If request is good

    // Update state to indicate the user is authenticated
    // Save the JWT, so users can make an authenticated request in the future
    // Redirect to route '/feature' 

  // If request is bad
    // Show an error

  }
}