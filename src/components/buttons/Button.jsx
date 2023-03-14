import { motion } from 'framer-motion'

export default function Button({ children, action, ...props }) {
	return (
		<motion.button
			whileTap={{ scale: 0.95 }}
			className='bg-background text-elevated h-14 w-64 rounded-xl shadow-[3px_4px_4px_#00000040] flex items-center justify-center'
			onClick={action ? action : props.onClick}
			{...props}
		>
			{children}
		</motion.button>
	)
}
