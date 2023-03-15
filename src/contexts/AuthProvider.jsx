import { createContext, useEffect } from 'react'
import { useState } from 'react'
import { useEffectOnce } from 'react-use'
import useCookie from 'react-use-cookie'
import formatDateToDays from '../utils/formatDateToDays'

export const AuthContext = createContext()

export default function AuthProvider({ children }) {
	const [authCookie, setAuthCookie] = useCookie('auth')

	const [auth, setAuth] = useState({
		userId: null,
		token: null,
		validUntil: null,
		role: null,
	})

	useEffectOnce(() => {
		if (authCookie) {
			setAuth(JSON.parse(authCookie))
		}
	})

	useEffect(() => {
		if (auth) {
			setAuthCookie(JSON.stringify(auth), {
				days: formatDateToDays(auth.validUntil),
			})
		}
	}, [auth])

	return (
		<AuthContext.Provider value={{ auth, setAuth }}>
			{children}
		</AuthContext.Provider>
	)
}
