import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { animatedListItem } from '../../utils/motion'

export default function ActivityCard({ activity }) {
	const navigate = useNavigate()

	return (
		<motion.li
			variants={animatedListItem}
			onClick={() => navigate(`activity/${activity.id}`)}
			className='w-full aspect-square relative rounded-t-[39px] rounded-bl-[39px] overflow-hidden'
		>
			<img
				className='aspect-square object-cover'
				src={activity.asset.url}
				alt=''
			/>
			<div className='absolute bottom-0 left-0 right-0 p-6 bg-primary/80 rounded-tr-[39px]'>
				<h2 className='text-xl font-bold'>
					<Link to={`activity/${activity.id}`}>{activity.name}</Link>
				</h2>
				<p>
					{activity.minAge} - {activity.maxAge} år
				</p>
			</div>
		</motion.li>
	)
}
