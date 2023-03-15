import { motion } from 'framer-motion'

export default function Button({ children, action, ...props }) {
	return (
		<motion.button
			whileTap={{ scale: props.disabled ? 1 : 0.95 }}
			className='bg-background text-elevated h-[54px] w-[249px] rounded-xl shadow-[3px_4px_4px_#00000040] flex items-center justify-center'
			{...props}
		>
			{children}
		</motion.button>
	)
}
