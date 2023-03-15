import { NavLink, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function NavigationLink({ link }) {
	const { pathname } = useLocation()

	return (
		<NavLink
			to={link.path}
			className='relative flex items-center justify-center h-10 w-10'
		>
			{link.icon}
			{pathname === link.path && (
				<motion.div
					layoutId='navigation-circle'
					className='absolute inset-0 rounded-full border border-text'
				/>
			)}
		</NavLink>
	)
}
