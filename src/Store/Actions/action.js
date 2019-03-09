import {BASE_URL} from './../../Utility/helper'

export function getPlanetSuccess(planets){
	return {type: 'GET_PLANET_SUCCESS', planets}
}

export function searchPlanet(term){
	return (dispatch) => {
		return fetch(BASE_URL+'planets/?search='+term)
    			.then(resp => resp.json())
      			.then(data => {
	      			let searchedPlanets = data.results
	        		dispatch(getPlanetSuccess(searchedPlanets))
      			})	
  }
}