import { ChevronLeft } from 'lucide-react'
import Button from './buttons/Button'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import RotatingLoader from './loaders/RotatingLoader'

export default function DetailsHeader({ activity }) {
	const navigate = useNavigate()
	const [imageLoaded, setImageLoaded] = useState(false)

	return (
		<div className='relative flex-grow flex-shrink-0 h-3/5 shadow-lg shadow-background'>
			<AnimatePresence>
				{!imageLoaded && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className='absolute top-0 left-0 w-full h-full bg-elevated/10 flex justify-center items-center'
					>
						<RotatingLoader />
					</motion.div>
				)}
			</AnimatePresence>
			<motion.img
				onLoad={() => setImageLoaded(true)}
				className='h-full w-full object-cover'
				src={activity?.asset?.url}
				alt=''
				initial={{ opacity: 0 }}
				animate={{ opacity: imageLoaded ? 1 : 0, transition: { delay: 0.1 } }}
			/>
			<motion.div
				initial={{ x: 'calc(100% + 2.5rem)' }}
				animate={{
					x: 0,
					transition: {
						delay: 0.1,
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
