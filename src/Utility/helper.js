import React from 'react';
import { Redirect } from 'react-router-dom'
const LOGOUT = (props) => {
  localStorage.clear()
  props.history.push('/login')
}

const BASE_URL = 'https://swapi.co/api/'
export { LOGOUT, BASE_URL } 
