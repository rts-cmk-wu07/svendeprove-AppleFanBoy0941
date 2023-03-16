import useAxios from '../hooks/useAxios'
import { useParams, useLocation } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthProvider'
import { SignInContext } from '../contexts/SignInProvider'
import RotatingLoader from '../components/loaders/RotatingLoader'
import { motion } from 'framer-motion'
import { Lock } from 'lucide-react'
import Button from '../components/buttons/Button'

export default function TeamOverview() {
	const location = useLocation()
	const { state } = location
	const { id } = useParams()
	const { auth } = useContext(AuthContext)
	const { setSignInOpen } = useContext(SignInContext)
	const { userId, role } = auth
	const { data, loading, error } = useAxios(`users/${userId}/roster/${id}`)

	const { data: activityData } = useAxios(state ? '' : `activities/${id}`, true)

	const activityName = state ? state.activityName : activityData?.name

	return (
		<div className='px-8 pt-8 pb-20'>
			<h1 className='text-elevated text-4xl font-semibold mb-8'>
				{activityName}
			</h1>
			{role !== 'instructor' && (
				<div className='flex flex-col items-center text-elevated/50 text-center gap-4 mt-12'>
					<Lock size={48} className='text-elevated' opacity={0.5} />
					<h2 className='text-xl'>Du er ikke logget ind som instruktør</h2>
					<p>
						Log ind som instruktør for denne aktivitet, eller gå tilbage til
						hjem
					</p>
					<Button type='secondary' onClick={() => setSignInOpen(true)}>
						Log ind
					</Button>
				</div>
			)}
			{loading ? (
				<div className='flex justify-center pt-16'>
					<RotatingLoader />
				</div>
			) : (
				<motion.ul
					variants={{
						initial: { opacity: 0 },
						animate: { opacity: 1, transition: { staggerChildren: 0.1 } },
						exit: { opacity: 0 },
					}}
					initial='initial'
					animate='animate'
					exit='exit'
					className='text-elevated/75 flex flex-col gap-4'
				>
					{data?.map(item => (
						<motion.li
							key={item.firstname + item.lastname}
							variants={{
								initial: { y: 24 },
								animate: { y: 0, scale: 1 },
								exit: { scale: 0 },
							}}
						>
							{item.firstname} {item.lastname}
						</motion.li>
					))}
				</motion.ul>
			)}
		</div>
	)
}
