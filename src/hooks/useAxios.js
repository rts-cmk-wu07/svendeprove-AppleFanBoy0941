import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { AuthContext } from '../contexts/AuthProvider'
import refreshToken from '../utils/refreshToken'

export default function useAxios(endpoint, noToken, fullUrl = false) {
	const [data, setData] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')

	const { auth, setAuth } = useContext(AuthContext)

	const { token } = auth

	function handleError(error) {
		console.log(error)
		setError({ status: error.response.status, error: error.response })
	}

	useEffect(() => {
		if (!token && !noToken) {
			setLoading(false)
			return
		}
		if (!endpoint) {
			setLoading(false)
			return
		}

		refreshToken(setAuth)
		;(async function () {
			try {
				const response = await axios.get(
					fullUrl ? endpoint : `${import.meta.env.VITE_API_URL}${endpoint}`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				)
				setData(response.data)
			} catch (err) {
				handleError(err)
			} finally {
				setLoading(false)
			}
		})()
	}, [endpoint, noToken, setData])

	async function getData(additionalEndpoint = '') {
		if (!token && !noToken) {
			setLoading(false)
			return
		}
		if (!endpoint) {
			setLoading(false)
			return
		}

		setLoading(true)

		refreshToken(setAuth)

		try {
			const response = await axios.get(
				fullUrl
					? endpoint + additionalEndpoint
					: `${import.meta.env.VITE_API_URL}${endpoint}${additionalEndpoint}`,
				{
					headers: {
						Authorization: !noToken && `Bearer ${token}`,
					},
				}
			)
			setData(response.data)
		} catch (err) {
			handleError(err)
		} finally {
			setLoading(false)
		}

		return data
	}

	async function postData(data, additionalEndpoint = '') {
		if (!token && !noToken) {
			setLoading(false)
			return
		}
		if (!endpoint) {
			setLoading(false)
			return
		}

		setLoading(true)

		refreshToken(setAuth)

		try {
			await axios.post(
				fullUrl
					? endpoint + additionalEndpoint
					: `${import.meta.env.VITE_API_URL}${endpoint}${additionalEndpoint}`,
				data,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)

			const newData = await getData()

			setData(newData)
		} catch (err) {
			handleError(err)
		}

		return data
	}

	async function patchData(data, additionalEndpoint = '') {
		if (!token && !noToken) {
			setLoading(false)
			return
		}
		if (!endpoint) {
			setLoading(false)
			return
		}

		refreshToken(setAuth)

		try {
			const response = await axios.patch(
				fullUrl
					? endpoint + additionalEndpoint
					: `${import.meta.env.VITE_API_URL}${endpoint}${additionalEndpoint}`,
				data,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			setData(response.data)
		} catch (err) {
			handleError(err)
		} finally {
			setLoading(false)
		}

		return data
	}

	async function deleteData(additionalEndpoint = '') {
		if (!token || !endpoint) {
			setLoading(false)
			return
		}

		setLoading(true)

		refreshToken(setAuth)

		try {
			await axios.delete(
				fullUrl
					? endpoint + additionalEndpoint
					: `${import.meta.env.VITE_API_URL}${endpoint}${additionalEndpoint}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)

			const newData = await getData()

			setData(newData)
		} catch (err) {
			handleError(err)
		}

		return data
	}

	return { data, loading, error, getData, postData, patchData, deleteData }
}
