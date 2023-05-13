import styles from './WithSpinner.module.sass'

import React from 'react'

const WithSpinner = WrappedComponent => ({ isLoading, spinnerClassName, spinnerContainerClassName, spinner: Spinner, ...otherProps }) => {
	// useEffect(() => console.log(is))
	console.log(isLoading)
	return (
		isLoading
			?
				Spinner
					?
						<Spinner />
					:
						<div className={`${styles.container} ${spinnerContainerClassName || ''}`}>
							<div className={`${styles.spinner} ${spinnerClassName}`}></div>
						</div>
			:

				<WrappedComponent {...otherProps} />
	)

}

export default WithSpinner


