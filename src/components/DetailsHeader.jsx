import { ChevronLeft } from 'lucide-react'
import Button from './buttons/Button'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function DetailsHeader({ activity }) {
	const navigate = useNavigate()

	return (
		<div className='relative flex-grow flex-shrink-0 h-3/5 shadow-lg shadow-background'>
			<img
				className='h-full w-full object-cover'
				src={activity?.asset?.url}
				alt=''
			/>
			<motion.div
				initial={{ x: 'calc(100% + 2.5rem)' }}
				animate={{
					x: 0,
					transition: {
						delay: 0.5,
						type: 'spring',
						stiffness: 500,
						damping: 50,
					},
				}}
				className='absolute bottom-6 right-6'
			>
				<Button>Tilmeld</Button>
			</motion.div>
			<motion.button
				initial={{ opacity: 0, scale: 0.5 }}
				animate={{
					opacity: 1,
					scale: 1,
					transition: {
						delay: 0.5,
						type: 'spring',
						stiffness: 500,
						damping: 50,
					},
				}}
				whileTap={{ scale: 0.95 }}
				onClick={() => navigate(-1)}
				className='absolute top-6 left-6 rounded-full h-[54px] aspect-square flex justify-center items-center bg-background text-elevated shadow-[3px_4px_4px_#00000040]'
			>
				<ChevronLeft />
			</motion.button>
		</div>
	)
}
