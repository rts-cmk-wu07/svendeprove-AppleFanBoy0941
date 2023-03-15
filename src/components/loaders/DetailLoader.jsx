import { motion } from 'framer-motion'

export default function DetailLoader() {
	return (
		<div className='flex flex-col h-screen'>
			<motion.div
				animate={{
					opacity: [0.25, 0.5, 0.25],
					transition: { duration: 1, repeat: Infinity },
				}}
				className='relative flex-grow flex-shrink-0 h-3/5 bg-elevated'
			>
				<motion.div
					animate={{
						opacity: [0.25, 0.5, 0.25],
						transition: { duration: 1, repeat: Infinity },
					}}
					className='w-[249px] h-[54px] bg-elevated rounded-xl flex items-center justify-center absolute right-6 bottom-6'
				/>
			</motion.div>
			<div className='flex-grow flex-shrink-0 h-2/5 px-6 pt-4'>
				<motion.div
					animate={{
						opacity: [0.25, 0.5, 0.25],
						transition: { duration: 1, repeat: Infinity, delay: 0.05 },
					}}
					style={{ width: Math.floor(Math.random() * 25) + 50 + '%' }}
					className='h-9 bg-elevated rounded-xl mb-1'
				/>
				<motion.div
					animate={{
						opacity: [0.25, 0.5, 0.25],
						transition: { duration: 1, repeat: Infinity, delay: 0.1 },
					}}
					style={{ width: Math.floor(Math.random() * 10) + 25 + '%' }}
					className='h-[27px] bg-elevated rounded-xl mb-4'
				/>
				<motion.div
					animate={{
						opacity: [0.25, 0.5, 0.25],
						transition: { duration: 1, repeat: Infinity, delay: 0.15 },
					}}
					style={{ width: Math.floor(Math.random() * 75) + 25 + '%' }}
					className='h-[27px] bg-elevated rounded-xl'
				/>
			</div>
		</div>
	)
}
