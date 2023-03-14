import useAxios from '../../hooks/useAxios'
import ActivityCard from './ActivityCard'
import { motion } from 'framer-motion'
import { animatedList, animatedListItem } from '../../utils/motion'

export default function ActivitiesList() {
	const { data, loading, error } = useAxios('activities', true)

	console.log(data, loading, error)

	return (
		<motion.ul
			variants={animatedList}
			initial='initial'
			animate='animate'
			exit='exit'
			className='flex flex-col gap-8'
		>
			{loading && <p>Loading...</p>}
			{error && <p>Error: {error}</p>}
			{data &&
				data?.map(activity => (
					<motion.li variants={animatedListItem}>
						<ActivityCard key={activity.id} activity={activity} />
					</motion.li>
				))}
		</motion.ul>
	)
}
