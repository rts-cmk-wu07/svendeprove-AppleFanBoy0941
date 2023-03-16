import { ChevronLeft } from 'lucide-react'
import Button from './buttons/Button'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useState, useContext } from 'react'
import RotatingLoader from './loaders/RotatingLoader'
import BackButton from './buttons/BackButton'
import { AuthContext } from '../contexts/AuthProvider'
import useAxios from '../hooks/useAxios'
import { SignInContext } from '../contexts/SignInProvider'

export default function DetailsHeader({ activity }) {
	const { auth } = useContext(AuthContext)
	const { setSignInOpen } = useContext(SignInContext)
	const navigate = useNavigate()
	const [imageLoaded, setImageLoaded] = useState(false)

	const { data, loading, getData, postData, deleteData, error } = useAxios(
		`users/${auth.userId}`
	)

	const hasSignedUp = data?.activities
		?.map(item => item.id)
		.includes(activity.id)

	function canSignUp() {
		if (data === null) return true
		if (data.role !== 'default') return false
		if (data.age > activity.maxAge) return false
		if (data.age < activity.minAge) return false

		return true
	}

	async function handleClick() {
		if (hasSignedUp) {
			removeActivityFromUser()
			return
		}
		await signUpForActivity()
	}

	async function signUpForActivity() {
		if (!auth.token) return setSignInOpen(true)
		await getData()

		await postData(null, `/activities/${activity.id}`)

		getData()
	}

	async function removeActivityFromUser() {
		await getData()

		await deleteData(`/activities/${activity.id}`)

		getData()
	}

	return (
		<>
			<div className='relative flex-grow flex-shrink-0 h-3/5 shadow-lg shadow-background'>
				<AnimatePresence>
					{!imageLoaded && (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							className='absolute top-0 left-0 w-full h-full bg-elevated/10 flex justify-center items-center'
						>
							<RotatingLoader />
						</motion.div>
					)}
				</AnimatePresence>
				<motion.img
					onLoad={() => setImageLoaded(true)}
					className='h-full w-full object-cover'
					src={activity?.asset?.url}
					alt=''
					initial={{ opacity: 0 }}
					animate={{ opacity: imageLoaded ? 1 : 0, transition: { delay: 0.1 } }}
				/>
				<motion.div
					initial={{ x: 'calc(100% + 2.5rem)' }}
					animate={{
						x: 0,
						transition: {
							delay: 0.1,
							type: 'spring',
							stiffness: 500,
							damping: 50,
						},
					}}
					className='absolute bottom-6 right-6'
				>
					{canSignUp() && (
						<Button onClick={handleClick}>
							<motion.p
								key={hasSignedUp}
								initial={{ opacity: 0, y: 8 }}
								animate={{ opacity: 1, y: 0 }}
							>
								{hasSignedUp ? 'Forlad' : 'Tilmeld'}
							</motion.p>
						</Button>
					)}
				</motion.div>
				<BackButton placement='left' onClick={() => navigate(-1)}>
					<ChevronLeft />
				</BackButton>
			</div>
		</>
	)
}
