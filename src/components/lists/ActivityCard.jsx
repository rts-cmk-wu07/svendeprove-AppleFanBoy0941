import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { animatedListItem } from '../../utils/motion'
import { useState } from 'react'
import RotatingLoader from '../loaders/RotatingLoader'

export default function ActivityCard({ activity }) {
	const navigate = useNavigate()
	const [showImage, setShowImage] = useState(false)

	return (
		<motion.li
			variants={animatedListItem}
			onClick={() => navigate(`/activity/${activity.id}`)}
			className='w-full aspect-square relative rounded-t-[39px] rounded-bl-[39px] overflow-hidden'
		>
			{!showImage && (
				<div className='absolute top-0 left-0 w-full h-full bg-elevated/10 flex justify-center items-center pb-12'>
					<RotatingLoader />
				</div>
			)}
			<motion.img
				onLoad={() => setShowImage(true)}
				className='aspect-square object-cover'
				src={activity.asset.url}
				alt={activity.name}
				initial={{ opacity: 0 }}
				animate={{ opacity: showImage ? 1 : 0 }}
			/>
			<div className='absolute bottom-0 left-0 right-0 p-6 bg-primary/80 rounded-tr-[39px] backdrop-blur'>
				<h2 className='text-xl font-bold'>
					<Link to={`/activity/${activity.id}`}>{activity.name}</Link>
				</h2>
				<p>
					{activity.minAge}-{activity.maxAge} år
				</p>
			</div>
		</motion.li>
	)
}
