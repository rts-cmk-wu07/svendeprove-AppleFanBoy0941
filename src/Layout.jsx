import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

export default function Layout() {
	const location = useLocation()

	return (
		<div>
			{/* Navigation komponent her */}
			<motion.div
				key={location.pathname}
				initial={{ opacity: 0, y: 128 }}
				animate={{ opacity: 1, y: 0, filter: 'blur(0)', scale: 1 }}
			>
				<Outlet />
			</motion.div>
		</div>
	)
}
