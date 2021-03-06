import axios from 'axios';
import { browserHistory } from 'react-router';

import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, FETCH_MESSAGE } from './types';

const API_URL = 'http://localhost:3147';

export function signinUser({ email, password }) {
  // Usually we return an object with props, NOT!! with 'redux-thunk'
  // this function that is returned is what gives us direct access to the dispatch method
  return function(dispatch) {
  // Submit email/password to the server
  axios.post(`${API_URL}/signin`, { email, password })
    // If request is good
    .then(response => {
      // Update state to indicate the user is authenticated
      dispatch({ type: AUTH_USER });
      // Save the JWT, so users can make an authenticated request in the future
      localStorage.setItem('token', response.data.token);
      // Redirect to route '/feature'
      browserHistory.push('/feature');
    })
  // If request is bad
    .catch(() => {
    // Show an error
      dispatch(authError('Bad Signin Info!'));
    });
  }
}

export function signupUser({ email, password }) {
  return function(dispatch) {
    axios.post(`${API_URL}/signup`, { email, password })
      .then(response => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', response.data.token);
        browserHistory.push('/feature');
      })
      .catch(response => dispatch(authError(response.data.error)));
  }
}

export function signoutUser() {
  localStorage.removeItem('token');

  return { type: UNAUTH_USER };
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}

export function fetchMessage() {
  return function(dispatch) {
    axios.get(API_URL, {
      headers: { authorization: localStorage.getItem('token') }
    })
     .then(response => {
       dispatch({
        type: FETCH_MESSAGE,
        payload: response.data.message
       })
     })
  }
}