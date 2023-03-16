import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import bgImage from '../assets/images/splash-image.jpg'
import BackButton from '../components/buttons/BackButton'
import Button from '../components/buttons/Button'
import Input from '../components/sub-components/Input'
import { useState, useContext } from 'react'
import axios from 'axios'
import InlineLoader from '../components/buttons/InlineLoader'
import { AuthContext, RememberMeContext } from '../contexts/AuthProvider'
import CheckBox from '../components/sub-components/CheckBox'

export default function SignInUp({ isOpen, setIsOpen }) {
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
				{
					username,
					password,
				}
			)

			setAuth(response.data)

			setIsOpen(false)
		} catch (error) {
			console.log(error)

			setPasswordError('Forkert brugernavn eller adgangskode')
		} finally {
			setLoading(false)
		}
	}

	// E3C8E7
	// FBF6FC

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className='bg-gradient-to-b from-[#E3C8E7] via-[#FBF6FC] via-[#FBF6FC] to-[#E3C8E7] fixed inset-0'
				>
					<motion.img
						src={bgImage}
						className='h-full w-full object-cover'
						alt='Landrup Dans'
						initial={{ opacity: 0 }}
						animate={{
							opacity: 1,
							transition: { delay: 0.25, duration: 1, ease: 'easeOut' },
						}}
					/>
					<div
						className='absolute inset-0 flex flex-col justify-center px-6'
						style={{
							background:
								'linear-gradient(-30deg, transparent 0% 28%, #5E2E5380 28% 80%, transparent 80% 100%)',
						}}
					>
						<h1 className='text-[48px] text-elevated'>Log ind</h1>
						<form className='flex flex-col gap-4' onSubmit={handleSignIn}>
							<Input
								placeholder='Brugernavn'
								name='username'
								autoComplete='given-name'
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
								<Button disabled={loading}>
									{loading ? <InlineLoader color='bg-primary' /> : 'Log ind'}
								</Button>
							</div>
						</form>
					</div>
					<BackButton
						placement='right'
						onClick={() => {
							setIsOpen(false)
							setUsername('')
							setPassword('')
							setUsernameError('')
							setPasswordError('')
						}}
						delay={1.5}
					>
						<X />
					</BackButton>
				</motion.div>
			)}
		</AnimatePresence>
	)
}
