import useAxios from '../../hooks/useAxios'
import ActivityCard from './ActivityCard'
import { AnimatePresence, motion } from 'framer-motion'
import { animatedList, animatedListItem } from '../../utils/motion'
import RotatingLoader from '../loaders/RotatingLoader'
import { AlertTriangle } from 'lucide-react'

export default function ActivitiesList({ filter }) {
	const { data, loading, error } = useAxios('activities', true)

	function filterClasses() {
		if (!filter || filter === '') return data
		if (!data || Object.keys(data).length < 1) return data

		const importance = {
			name: 3,
			description: 2,
			weekday: 1,
			time: 1,
			age: 2,
		}

		const filtered = data?.filter(item => {
			let score = 0
			Object.keys(importance).forEach(key => {
				if (key === 'time') {
					if (item.time.includes(filter)) {
						score += importance[key]
					} else if (item.time.replace(':', '.').includes(filter)) {
						score += importance[key]
					} else if (item.time.replace(':', '').includes(filter)) {
						score += importance[key]
					}
				} else if (key === 'age') {
					if (
						parseInt(filter) >= item.minAge &&
						parseInt(filter) <= item.maxAge
					)
						score += importance[key]
				} else {
					if (item[key].toLowerCase().includes(filter)) {
						score += importance[key]
					}
				}
			})
			return score > 0
		})

		const sorted = filtered.sort((a, b) => a - b)

		return sorted
	}

	return (
		<motion.ul
			variants={animatedList}
			initial='initial'
			animate='animate'
			exit='exit'
			className='flex flex-col gap-8'
		>
			{loading && (
				<div className='flex justify-center pt-16'>
					<RotatingLoader />
				</div>
			)}
			{error && <p>Error: {error}</p>}
			{data &&
				filterClasses().map(activity => (
					<ActivityCard key={activity.id} activity={activity} />
				))}
			<AnimatePresence mode='popLayout'>
				{filter && filterClasses()?.length < 1 && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1, transition: { delay: 0.25 } }}
						exit={{ opacity: 0 }}
						className=' text-elevated/50 flex flex-col items-center gap-2'
					>
						<AlertTriangle size={48} className='opacity-50' />
						<p className='text-xl'>Ingen aktiviteter blev fundet</p>
						<p className='opacity-50'>Prøv at søge efter noget andet</p>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.ul>
	)
}
