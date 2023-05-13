import axios from 'axios'
import styles from './HealthCheck.module.sass'

import React, { useEffect, useState } from 'react'
import DivWithSpinner from './DivWithSpinner'
import { SERVER_URL } from '../../consts/app-keys.const'


const HealthCheck = ({children, ...props}) => {
	const [isSuccess, setIsSuccess] = useState(false)
	const [isLoading, setIsLoading] = useState(true)
	const [waitTime, setWaitTime] = useState(0)
	// const [waitTimeIntervalId, setWaitTimeIntervalId] = useState(0)
	// const [message, setMessage] = useState('Please wait until the server wakes up. It can take 20-60 sec')

  useEffect(() => {
    axios.get(SERVER_URL)
			.then(() => setIsSuccess(true))
			.catch()
			.finally(() => setIsLoading(false))
  }, [])

	useEffect(() => {
		isLoading && setTimeout(() => setWaitTime(waitTime + 1), 1000)
	}, [waitTime, isLoading])

	return (
		isLoading
			?
				<div style={{width: '100%'}}>
					<DivWithSpinner isLoading={true} />
					<p className={styles.waitMessage}>{waitTime >= 3 ? `Please wait for demo server to wake up. It can take 20-60 s. Waiting time: ${waitTime} s` : ""}</p>
					<br />
					<p className={styles.waitMessage}>{waitTime >= 3 ? `The server falls asleep after each 15 min of inactivity in order to remain free of charge` : ""}</p>
				</div>
				
			:
				isSuccess
					?
						<>
							{children}
						</>
					:
						<div>
							Cant wake up the server!
						</div>
	)

}

export default HealthCheck