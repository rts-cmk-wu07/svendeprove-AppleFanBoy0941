import { createContext } from 'react'
import { useState } from 'react'

export const AuthContext = createContext()

export default function AuthProvider({ children }) {
	const [auth, setAuth] = useState({
		userId: null,
		token: null,
		expires: null,
	})
	// TODO: ændr disse når api skal kobles til

	return (
		<AuthContext.Provider value={{ auth, setAuth }}>
			{children}
		</AuthContext.Provider>
	)
}
