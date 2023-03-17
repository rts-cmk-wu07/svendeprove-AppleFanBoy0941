import { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthProvider'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function CalendarItem({ activity, index }) {
	const { auth } = useContext(AuthContext)
	const { role } = auth

	const navigate = useNavigate()

	const link =
		role !== 'instructor'
			? `/activity/${activity.id}`
			: `/calendar/roster/${activity.id}`

	return (
		<motion.li
			initial={{ y: 24, opacity: 0 }}
			animate={{
				y: 0,
				opacity: 1,
				transition: {
					y: {
						type: 'spring',
						stiffness: 500,
						damping: 50,
						delay: 0.1 * index,
					},
				},
			}}
			onClick={() => navigate(link, { state: { activityName: activity.name } })}
			className='bg-elevated px-6 py-4 rounded-xl'
		>
			<h2 className='text-xl font-bold w-full'>
				<Link
					className='block w-full whitespace-nowrap text-ellipsis overflow-hidden'
					to={link}
					state={{ activityName: activity.name }}
				>
					{activity.name}
				</Link>
			</h2>
			<p>
				<span className='capitalize'>{activity.weekday}</span> {activity.time}
			</p>
		</motion.li>
	)
}
