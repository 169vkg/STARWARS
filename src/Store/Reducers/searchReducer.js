const initialState = {
	planets : []
}

const searchReducer = (state = initialState , action) => {
	if(action.type === 'GET_PLANET_SUCCESS') {
		return {...state, planets: action.planets}
	}
	else {
		return initialState
	}
}

export default searchReducer
