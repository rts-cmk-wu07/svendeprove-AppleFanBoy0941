import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

export default function Layout() {
	const location = useLocation()

	return (
		<div>
			{/* Navigation komponent her */}
			<AnimatePresence mode='popLayout'>
				<motion.div
					key={location.pathname}
					initial={{ opacity: 0, y: 128 }}
					animate={{ opacity: 1, y: 0, filter: 'blur(0)', scale: 1 }}
					exit={{
						opacity: 0,
						scale: 0.5,
						filter: 'blur(24px)',
						transition: { ease: 'easeIn' },
					}}
				>
					<Outlet />
				</motion.div>
			</AnimatePresence>
		</div>
	)
}
