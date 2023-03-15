import { motion } from 'framer-motion'

export default function InlineLoader({ color = 'bg-background' }) {
	return (
		<div className='flex items-center gap-1'>
			<motion.div
				animate={{
					opacity: [0, 1, 0],
					scale: [0.75, 1, 0.75],
					transition: {
						duration: 1.5,
						repeat: Infinity,
					},
				}}
				className={`h-2 w-2 rounded-full ${color}`}
			/>
			<motion.div
				animate={{
					opacity: [0, 1, 0],
					scale: [0.75, 1, 0.75],
					transition: {
						duration: 1.5,
						repeat: Infinity,
						delay: 0.1,
					},
				}}
				className={`h-2 w-2 rounded-full ${color}`}
			/>
			<motion.div
				animate={{
					opacity: [0, 1, 0],
					scale: [0.75, 1, 0.75],
					transition: {
						duration: 1.5,
						repeat: Infinity,
						delay: 0.2,
					},
				}}
				className={`h-2 w-2 rounded-full ${color}`}
			/>
		</div>
	)
}
