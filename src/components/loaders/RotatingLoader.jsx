import { motion } from 'framer-motion'

export default function RotatingLoader({ size = 6, delay }) {
	function template({ rotate, y, scale }) {
		return `rotate(${rotate}) translateY(${y}) scale(${scale})`
	}
	const array = Array.from({ length: size }, (_, i) => i)

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1, transition: { delay: delay || 0 } }}
			className='w-24 h-24 relative flex justify-center items-center'
		>
			<motion.div
				className='absolute w-16 h-16 bg-primary blur-2xl'
				animate={{ scale: [0.75, 1, 0.75], opacity: [0.75, 1, 0.75] }}
				transition={{
					repeat: Infinity,
					repeatType: 'loop',
					duration: array.length * 0.1667 + 0.25,
					ease: 'easeInOut',
				}}
			></motion.div>
			{array.map((_, i) => (
				<motion.div
					transformTemplate={template}
					key={i}
					className='absolute w-4 h-4 bg-primary rounded-full'
					initial={{
						rotate: i * (360 / array.length),
						y: (-8 * array.length) / 2,
					}}
					animate={{
						rotate: i * (360 / array.length),
						y: [
							(-16 * array.length) / 2,
							(-8 * array.length) / 2,
							(-8 * array.length) / 2,
							(-4 * array.length) / 2,
						],
						opacity: [0, 1, 1, 0],
						scale: [0.5, 1, 1, 0.5],
						filter: ['blur(8px)', 'blur(0px)', 'blur(0px)', 'blur(0px)'],
					}}
					transition={{
						repeat: Infinity,
						repeatType: 'loop',
						duration: array.length * 0.1667,
						delay: i * 0.05,
						repeatDelay: 0.25,
					}}
				/>
			))}
		</motion.div>
	)
}
