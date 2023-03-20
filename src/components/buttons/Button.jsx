import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import InlineLoader from './InlineLoader'

export default function Button({
	children,
	action,
	to,
	color,
	additionalClass,
	loading,
	fullWidth,
	...props
}) {
	const className = `${
		color === 'secondary'
			? 'bg-elevated text-background'
			: 'bg-background text-elevated'
	} h-[54px] ${
		fullWidth ? 'w-full' : 'w-[249px]'
	} rounded-xl shadow-[3px_4px_4px_#00000040] flex items-center justify-center ${additionalClass}`
	return (
		<>
			{to ? (
				<motion.div whileTap={{ scale: props.disabled ? 1 : 0.95 }}>
					<Link to={to} className={className} {...props}>
						{children}
					</Link>
				</motion.div>
			) : (
				<motion.button
					whileTap={{ scale: props.disabled ? 1 : 0.95 }}
					className={className}
					{...props}
				>
					{loading ? (
						<InlineLoader
							color={color === 'secondary' ? 'bg-text' : 'bg-primary'}
						/>
					) : (
						children
					)}
				</motion.button>
			)}
		</>
	)
}
