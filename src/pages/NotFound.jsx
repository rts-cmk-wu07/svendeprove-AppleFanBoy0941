import { Construction } from 'lucide-react'
import Button from '../components/buttons/Button'
import { motion } from 'framer-motion'
import { useTitle } from 'react-use'

export default function NotFound() {
	useTitle('Vi kunne ikke finde siden – Landrup Dans')

	return (
		<div className='flex flex-col gap-2 items-center justify-center h-screen text-elevated/50 p-6 text-center'>
			<Construction className='text-elevated' size={48} opacity={0.5} />
			<motion.h1 className='text-4xl font-bold text-elevated mb-4 flex'>
				<motion.span
					className='inline-block'
					initial={{ opacity: 0, y: 48 }}
					animate={{
						opacity: 1,
						y: 0,
						transition: {
							delay: 0.4,
							type: 'spring',
							stiffness: 500,
							damping: 50,
							opacity: {
								delay: 0.3,
							},
						},
					}}
				>
					4
				</motion.span>
				<motion.span
					className='inline-block'
					initial={{ opacity: 0, y: 48 }}
					animate={{
						opacity: 1,
						y: 0,
						transition: {
							delay: 0.6,
							type: 'spring',
							stiffness: 500,
							damping: 50,
							opacity: {
								delay: 0.5,
							},
						},
					}}
				>
					0
				</motion.span>
				<motion.span
					className='inline-block'
					initial={{ opacity: 0, y: 48 }}
					animate={{
						opacity: 1,
						y: 0,
						transition: {
							delay: 0.8,
							type: 'spring',
							stiffness: 500,
							damping: 50,
							opacity: {
								delay: 0.7,
							},
						},
					}}
				>
					4
				</motion.span>
			</motion.h1>
			<motion.p
				initial={{ opacity: 0, y: 32 }}
				animate={{
					opacity: 1,
					y: 0,
					transition: {
						delay: 0.9,
						type: 'spring',
						stiffness: 500,
						damping: 50,
						opacity: { delay: 0.8 },
					},
				}}
			>
				Vi kunne desværre ikke finde denne side.
			</motion.p>
			<motion.p
				initial={{ opacity: 0, y: 32 }}
				animate={{
					opacity: 1,
					y: 0,
					transition: {
						delay: 1.1,
						type: 'spring',
						stiffness: 500,
						damping: 50,
						opacity: { delay: 1 },
					},
				}}
			>
				Du er måske ikke en god danser endnu, men vi kan tage dig et skridt i
				den rigtige retning.
			</motion.p>
			<motion.div
				initial={{ opacity: 0, y: 48 }}
				animate={{
					opacity: 1,
					y: 0,
					transition: {
						delay: 1.2,
						stiffness: 500,
						damping: 50,
						opacity: { delay: 1.1 },
					},
				}}
			>
				<Button to='/' color='secondary' additionalClass='mt-4'>
					Gå til forsiden
				</Button>
			</motion.div>
		</div>
	)
}
