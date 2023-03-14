import { Outlet, useLocation, ScrollRestoration } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'

export default function Layout() {
	const { pathname } = useLocation()

	return (
		<div>
			{/* Navigation komponent her */}
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
		</div>
	)
}
