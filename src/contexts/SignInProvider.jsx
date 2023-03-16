import { createContext, useState } from 'react'
import SignInUp from '../templates/SignInUp'

export const SignInContext = createContext()

export default function SignInProvider({ children }) {
	const [signInOpen, setSignInOpen] = useState(false)

	return (
		<SignInContext.Provider value={{ signInOpen, setSignInOpen }}>
			{children}
			<SignInUp isOpen={signInOpen} setIsOpen={setSignInOpen} />
		</SignInContext.Provider>
	)
}
