import useAxios from '../hooks/useAxios'
import { useParams, useLocation } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthProvider'
import { SignInContext } from '../contexts/SignInProvider'
import RotatingLoader from '../components/loaders/RotatingLoader'
import { motion } from 'framer-motion'
import { Lock } from 'lucide-react'
import Button from '../components/buttons/Button'
import Info from '../components/Info'
import SiteTitle from '../components/sub-components/SiteTitle'

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
			<SiteTitle title={activityName} />
			{role !== 'instructor' && (
				<Info
					icon='Lock'
					title='Du er ikke logget ind som instruktør'
					body={[
						'Log ind som inistruktør for denne aktivitet, eller gå tilbage til hjem',
					]}
					actions={[
						{
							label: 'Log ind',
							options: {
								type: 'secondary',
								onClick: () => setSignInOpen(true),
							},
						},
						{
							label: 'Gå til hjem',
							options: {
								type: 'secondary',
								to: '/',
							},
						},
					]}
				/>
			)}
			{loading ? (
				<div className='flex justify-center pt-16'>
					<RotatingLoader delay={0.5} />
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
