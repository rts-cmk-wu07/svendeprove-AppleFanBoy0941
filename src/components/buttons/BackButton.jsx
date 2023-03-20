import { motion } from 'framer-motion'

export default function BackButton({
	children,
	placement = 'left',
	floating = true,
	delay,
	color,
	additionalClass,
	...props
}) {
	return (
		<motion.button
			initial={{ opacity: 0, scale: 0.5 }}
			animate={{
				opacity: 1,
				scale: 1,
				transition: {
					delay: delay || 0.5,
					type: 'spring',
					stiffness: 500,
					damping: 50,
				},
			}}
			whileTap={{ scale: 0.95 }}
			className={`${floating ? 'absolute top-6' : 'static'} ${
				placement === 'left' && floating ? 'left-6' : 'right-6'
			} rounded-full h-[54px] aspect-square flex justify-center items-center ${
				color === 'secondary'
					? 'bg-elevated text-background'
					: 'bg-background text-elevated'
			} shadow-[3px_4px_4px_#00000040] ${additionalClass}`}
			{...props}
		>
			{children}
		</motion.button>
	)
}
