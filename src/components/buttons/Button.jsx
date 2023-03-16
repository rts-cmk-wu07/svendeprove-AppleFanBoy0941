import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function Button({
	children,
	action,
	to,
	type,
	additionalClass,
	...props
}) {
	const className = `${
		type === 'secondary'
			? 'bg-elevated text-background'
			: 'bg-background text-elevated'
	} h-[54px] w-[249px] rounded-xl shadow-[3px_4px_4px_#00000040] flex items-center justify-center ${additionalClass}`
	return (
		<>
			{to ? (
				<Link
					to={to}
					whileTap={{ scale: props.disabled ? 1 : 0.95 }}
					className={className}
					{...props}
				>
					{children}
				</Link>
			) : (
				<motion.button
					whileTap={{ scale: props.disabled ? 1 : 0.95 }}
					className={className}
					{...props}
				>
					{children}
				</motion.button>
			)}
		</>
	)
}
