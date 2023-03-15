import { Outlet, useLocation, ScrollRestoration } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navigation from './templates/Navigation'

export default function Layout() {
	const { pathname } = useLocation()

	return (
		<div>
			<motion.div
				key={pathname}
				initial={{ opacity: 0, y: 128 }}
				animate={{
					opacity: 1,
					y: 0,
					scale: 1,
					transition: { type: 'spring', stiffness: 500, damping: 50 },
				}}
			>
				<Outlet />
			</motion.div>
			<ScrollRestoration />
			<Navigation />
		</div>
	)
}
