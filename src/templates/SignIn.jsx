import Input from '../components/sub-components/Input'
import CheckBox from '../components/sub-components/CheckBox'
import Button from '../components/buttons/Button'
import { useState, useContext } from 'react'
import axios from 'axios'
import { AuthContext, RememberMeContext } from '../contexts/AuthProvider'

export default function SignIn({ setIsOpen }) {
	const { setAuth } = useContext(AuthContext)
	const { rememberMe, setRememberMe } = useContext(RememberMeContext)

	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const [usernameError, setUsernameError] = useState('')
	const [passwordError, setPasswordError] = useState('')

	const [loading, setLoading] = useState(false)

	async function handleSignIn(event) {
		event.preventDefault()

		setUsernameError('')
		setPasswordError('')

		if (!username) return setUsernameError('Indtast venligst et brugernavn')
		if (!password) return setPasswordError('Indtast venligst et kodeord')

		setLoading(true)

		try {
			const response = await axios.post(
				`${import.meta.env.VITE_AUTH_URL}token`,
				{ username, password }
			)

			setAuth(response.data)

			setIsOpen(false)

			setUsername('')
			setPassword('')
		} catch (error) {
			console.log(error)

			setPasswordError('Forkert brugernavn eller adgangskode')
		} finally {
			setLoading(false)
		}
	}

	return (
		<>
			<h1 className='text-[48px] text-elevated'>Log ind</h1>
			<form className='flex flex-col gap-4' onSubmit={handleSignIn}>
				<Input
					placeholder='Brugernavn'
					name='username'
					autoComplete='username'
					value={username}
					onChange={e => setUsername(e.target.value)}
					errorMessage={usernameError}
				/>
				<Input
					placeholder='Adgangskode'
					type='password'
					name='password'
					autoComplete='current-password'
					value={password}
					onChange={e => setPassword(e.target.value)}
					errorMessage={passwordError}
				/>
				<CheckBox
					label='Husk mig'
					value={rememberMe}
					setValue={setRememberMe}
				/>
				<div className='flex justify-center mt-4'>
					<Button disabled={loading} loading={loading}>
						Log ind
					</Button>
				</div>
			</form>
		</>
	)
}
