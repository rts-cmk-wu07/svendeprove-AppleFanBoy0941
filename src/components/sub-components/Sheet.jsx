import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

export default function Sheet({
	children,
	isOpen,
	setIsOpen,
	clickOutsideCloses = true,
	showCloseButton = true,
}) {
	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					initial={{
						background: '#ffffff00',
						backdropFilter: 'blur(0px)',
					}}
					animate={{
						background: '#ffffffff',
						backdropFilter: 'blur(4px)',
						opacity: 1,
						transition: { duration: 0.4 },
					}}
					exit={{
						backdropFilter: 'blur(0px)',
						opacity: 0,
					}}
					className='fixed inset-0 flex flex-col pt-32 px-6 z-50'
					onClick={e => {
						if (
							clickOutsideCloses &&
							!e.target.classList.contains('dontclose')
						) {
							setIsOpen(false)
						}
					}}
				>
					{showCloseButton && (
						<motion.button
							initial={{ opacity: 0, scale: 0.9 }}
							animate={{ opacity: 1, scale: 1, transition: { delay: 0.3 } }}
							onClick={() => {
								setIsOpen(false)
							}}
							className='top-6 right-6 h-8 w-8 absolute'
						>
							<X className='h-8 w-8 text-elevated' strokeWidth={3} />
						</motion.button>
					)}
					{children}
				</motion.div>
			)}
		</AnimatePresence>
	)
}
