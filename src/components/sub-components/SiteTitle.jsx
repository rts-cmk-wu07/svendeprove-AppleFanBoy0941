import { motion } from 'framer-motion'

export default function SiteTitle({ title }) {
	return (
		<motion.h1
			initial={{ opacity: 0, y: 24 }}
			animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
			className='text-elevated text-4xl font-semibold px-2 mb-8'
		>
			{title}
		</motion.h1>
	)
}
