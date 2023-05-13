import React from 'react'
import WithSpinner from './WithSpinner/WithSpinner'

const DivWithSpinner = ({children, ...otherProps}) => {
	return (
		<div {...otherProps}>
			{children}
		</div>
	)
}



export default WithSpinner(DivWithSpinner)
