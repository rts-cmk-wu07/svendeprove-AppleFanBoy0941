import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'
import refreshToken from '../utils/refreshToken'

export default function useAxios(endpoint, noToken, fullUrl = false) {
	const [data, setData] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')

	const { auth, setAuth } = useContext(AuthContext)

	const { token } = auth

	useEffect(() => {
		if (!token || !noToken || !endpoint) {
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
							Authorization: !noToken && `Bearer ${token}`,
						},
					}
				)
				setData(response.data)
			} catch (err) {
				setError(err)
				// TODO: improve error handling, the user should not see the error message from the server
			} finally {
				setLoading(false)
			}
		})()
	}, [endpoint, noToken, setData])

	async function getData(additionalEndpoint = '') {
		if (!token || !noToken || !endpoint) {
			setLoading(false)
			return
		}

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
			setError(err)
		} finally {
			setLoading(false)
		}

		return data
	}

	async function postData(data, additionalEndpoint = '') {
		if (!token || !noToken || !endpoint) {
			setLoading(false)
			return
		}

		refreshToken(setAuth)

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
			setData(response.data)
		} catch (err) {
			setError(err)
		} finally {
			setLoading(false)
		}

		return data
	}

	async function patchData(data, additionalEndpoint = '') {
		if (!token || !noToken || !endpoint) {
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
			setError(err)
		} finally {
			setLoading(false)
		}

		return data
	}

	async function deleteData(additionalEndpoint = '') {
		if (!token || !noToken || !endpoint) {
			setLoading(false)
			return
		}

		refreshToken(setAuth)

		try {
			const response = await axios.delete(
				fullUrl
					? endpoint + additionalEndpoint
					: `${import.meta.env.VITE_API_URL}${endpoint}${additionalEndpoint}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			setData(response.data)
		} catch (err) {
			setError(err)
		} finally {
			setLoading(false)
		}

		return data
	}

	return { data, loading, error, getData, postData, patchData, deleteData }
}