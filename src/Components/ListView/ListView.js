import React from 'react';
import './ListView.css';

const ListView = props => props.data.planets.map((planet, index) => {
	return(
		<div className="listContainer" key = {index} >
			<div>{planet.name}</div>
			<div>{planet.population}</div>
		</div>
	)}
)

export default ListView
