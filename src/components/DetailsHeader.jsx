import { ChevronLeft, User } from 'lucide-react'
import Button from './buttons/Button'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useState, useContext } from 'react'
import RotatingLoader from './loaders/RotatingLoader'
import BackButton from './buttons/BackButton'
import { AuthContext } from '../contexts/AuthProvider'
import useAxios from '../hooks/useAxios'
import { SignInContext } from '../contexts/SignInProvider'
import { Lock } from 'lucide-react'
import PopUp from './PopUp'
import {
	isInstructor,
	isWithinAge,
	activityIsFull,
	hasActivityThisDay,
	hasSignedUp,
} from '../utils/activityHelpers'

export default function DetailsHeader({ activity }) {
	const { auth } = useContext(AuthContext)
	const { setSignInOpen } = useContext(SignInContext)
	const navigate = useNavigate()
	const [imageLoaded, setImageLoaded] = useState(false)
	const [popUpOpen, setPopUpOpen] = useState(false)

	const { data, loading, getData, postData, deleteData } = useAxios(
		`users/${auth.userId}`
	)

	function canSignUp() {
		if (data === null) return true
		if (hasSignedUp(data, activity)) return true
		if (!isWithinAge(data, activity)) return false
		if (isInstructor(data, activity)) return false
		if (hasActivityThisDay(data, activity)) return false
		if (activityIsFull(activity)) return false

		return true
	}

	async function handleClick() {
		if (hasSignedUp(data, activity)) {
			removeActivityFromUser()
			return
		}

		const date = new Date()
		const weekday = date.getDay()
		const weekdays = [
			'søndag',
			'mandag',
			'tirsdag',
			'onsdag',
			'torsdag',
			'fredag',
			'lørdag',
		]

		if (weekdays[weekday] === activity.weekday) {
			setPopUpOpen(true)
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

	const showButton = hasSignedUp(data, activity) !== undefined || !data

	return (
		<>
			<div className='relative flex-grow flex-shrink-0 h-3/5 shadow-lg shadow-background'>
				<AnimatePresence>
					{!imageLoaded && (
						<motion.div
							// initial={{ opacity: 0 }}
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
					alt={activity.name}
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
					className='absolute bottom-6 right-6 h-[56px] w-[249px]'
				>
					{showButton && (
						<Button
							onClick={handleClick}
							disabled={!canSignUp() || loading}
							loading={loading}
						>
							{canSignUp() ? (
								<motion.p
									key={hasSignedUp(data, activity)}
									initial={{ opacity: 0, y: 8 }}
									animate={{ opacity: 1, y: 0 }}
								>
									{hasSignedUp(data, activity) ? 'Forlad' : 'Tilmeld'}
								</motion.p>
							) : isInstructor(data, activity) ? (
								<div className='flex items-center gap-2'>
									<User opacity={0.5} />
									Du er instruktør
								</div>
							) : !isWithinAge(data, activity) ? (
								<div className='flex items-center gap-2'>
									<Lock opacity={0.5} />
									Udenfor aldersgrænse
								</div>
							) : hasActivityThisDay(data, activity) ? (
								<div>Du har aktivitet {activity.weekday}</div>
							) : activityIsFull(activity) ? (
								<div className='flex items-center gap-2'>
									<Lock opacity={0.5} />
									Aktivitet fuld
								</div>
							) : (
								<div>Der skete en fejl</div>
							)}
						</Button>
					)}
				</motion.div>
				<BackButton placement='left' onClick={() => navigate(-1)}>
					<ChevronLeft />
				</BackButton>
				<PopUp
					title='Du er tilmeldt fra næste uge'
					text='Du kan desværre ikke tilmelde dig fra i dag, men du vil være tilmeldt fra næste uge'
					isOpen={popUpOpen}
					setIsOpen={setPopUpOpen}
					action={signUpForActivity}
					actionLabel='OK'
					cancelLabel='Anuller'
				/>
			</div>
		</>
	)
}
