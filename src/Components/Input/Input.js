import React from 'react';
import './Input.css';

const Input = props => {
	let inputElement = null;
	let classname = "InputElement"
	switch (props.elementType) {
		case ('input'):
			inputElement =<input
				className = {classname}
				{...props.elementConfig}
				onChange={props.changed}
				value={props.value} />
		break
		case ('select'):
			inputElement =(
				<select
					className = {classname}
					onChange={props.changed}
				 	value={props.value}>
					{props.elementConfig.options.map((option)=>(
						<option key={option.value} value={option.value}>
							{option.displayLabel}
						</option>
					))}
				</select>
			)
		break
		default:
			inputElement =<input
				className = {classname}
				onChange={props.changed}
				{...props.elementConfig}
				value={props.value} />
	}
	return(
		<div className = "Input">
			{inputElement}
		</div>
	)}

export default Input
