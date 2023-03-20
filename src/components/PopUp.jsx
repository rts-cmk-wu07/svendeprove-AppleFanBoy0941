import { AnimatePresence, motion } from 'framer-motion'
import Button from './buttons/Button'

export default function PopUp({
	title,
	text,
	action,
	isOpen,
	actionLabel,
	showCancel,
	cancelLabel,
	setIsOpen,
}) {
	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className='fixed inset-0 flex items-center justify-center p-6 bg-text/50'
					onClick={e => {
						if (!e.target.classList.contains('modal')) {
							setIsOpen(false)
						}
					}}
				>
					<motion.div
						initial={{ opacity: 0, y: 128, scale: 0.5 }}
						animate={{
							opacity: 1,
							y: 0,
							scale: 1,
							transition: {
								delay: 0.2,
								type: 'spring',
								stiffness: 500,
								damping: 50,
								opacity: { delay: 0 },
							},
						}}
						className='modal bg-background rounded-3xl w-full shadow-2xl shadow-text/50 flex flex-col items-center text-center p-6 text-elevated'
					>
						<h2 className='text-3xl font-bold mb-4 pointer-events-none'>
							{title}
						</h2>
						<p className='text-elevated/50 pointer-events-none'>{text}</p>
						<div className='mt-8 flex flex-col gap-4 w-full'>
							{action && (
								<Button
									fullWidth
									onClick={() => {
										action()
										setIsOpen(false)
									}}
									additionalClass='modal mt-auto'
									color='secondary'
								>
									{actionLabel}
								</Button>
							)}
							{showCancel ||
								(cancelLabel && (
									<Button
										fullWidth
										color='secondary'
										onClick={() => setIsOpen(false)}
										additionalClass='modal opacity-50'
									>
										{cancelLabel}
									</Button>
								))}
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	)
}
