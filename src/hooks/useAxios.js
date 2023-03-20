import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { AuthContext } from '../contexts/AuthProvider'

export default function useAxios(
	endpoint,
	noToken,
	fullUrl = false,
	noGet = false
) {
	const [data, setData] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')

	const { auth } = useContext(AuthContext)

	const { token } = auth

	function handleError(error) {
		console.log(error)
		setError({ status: error.response.status, error: error.response })
	}

	useEffect(() => {
		if (noGet) return setLoading(false)
		if (!token && !noToken) {
			setLoading(false)
			return
		}
		if (!endpoint) {
			setLoading(false)
			return
		}

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

		try {
			const response = await axios.post(
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

			if (noGet) {
				setData(response.data)
				setLoading(true)
				return
			}
			const newData = await getData()

			setData(newData)
		} catch (err) {
			handleError(err)
			setLoading(false)
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
