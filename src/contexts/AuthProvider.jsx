import { createContext, useEffect } from 'react'
import { useState } from 'react'
import { useEffectOnce } from 'react-use'
import useCookie from 'react-use-cookie'
import formatDateToDays from '../utils/formatDateToDays'
import useSessionStorage from '../hooks/useSessionStorage'

export const AuthContext = createContext()
export const RememberMeContext = createContext()

export default function AuthProvider({ children }) {
	const [authCookie, setAuthCookie] = useCookie('auth')
	const [authSession, setAuthSession] = useSessionStorage('auth')
	const [rememberMe, setRememberMe] = useState(false)

	const [auth, setAuth] = useState({})

	useEffectOnce(() => {
		if (authCookie) {
			setAuth(JSON.parse(authCookie))
			setRememberMe(true)
		} else if (authSession) {
			setAuth(JSON.parse(authSession))
		}
	})

	useEffect(() => {
		if (auth.action === 'delete') {
			if (rememberMe) {
				setAuthCookie(null, { days: -1 })
			} else {
				setAuthSession(null)
			}
			setRememberMe(false)
			return
		}
		if (Object.keys(auth).length > 0) {
			if (rememberMe) {
				setAuthCookie(JSON.stringify(auth), {
					days: formatDateToDays(auth.validUntil),
				})
			} else {
				setAuthSession(JSON.stringify(auth))
			}
		}
	}, [auth])

	return (
		<AuthContext.Provider value={{ auth, setAuth }}>
			<RememberMeContext.Provider value={{ rememberMe, setRememberMe }}>
				{children}
			</RememberMeContext.Provider>
		</AuthContext.Provider>
	)
}
