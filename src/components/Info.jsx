import * as icons from 'lucide-react'
import Button from './buttons/Button'
import { motion } from 'framer-motion'

export default function Info({ icon, title, body, actions, extraPadding }) {
	const Icon = icons[icon]

	const containerVariants = {
		initial: {
			opacity: 0,
		},
		animate: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
				delayChildren: 0.2,
			},
		},
	}

	const itemVariants = {
		initial: {
			opacity: 0,
			y: 48,
		},
		animate: {
			opacity: 1,
			y: 0,
			transition: {
				y: {
					type: 'spring',
					stiffness: 500,
					damping: 50,
				},
				opacity: {
					ease: 'easeOut',
					duration: 0.75,
				},
			},
		},
	}

	return (
		<motion.div
			key={body?.length || 1}
			variants={containerVariants}
			initial='initial'
			animate='animate'
			className={`flex flex-col items-center text-elevated/50 text-center gap-2 mt-12 ${
				extraPadding && 'px-8'
			}`}
		>
			<Icon size={48} className='text-elevated mb-2' opacity={0.5} />
			<motion.h2 variants={itemVariants} className='text-xl'>
				{title && title}
			</motion.h2>
			<motion.div className='flex flex-col gap-2 opacity-50'>
				{body &&
					body?.map((paragraph, index) => (
						<motion.p variants={itemVariants} key={index}>
							{paragraph}
						</motion.p>
					))}
			</motion.div>
			<motion.div className='flex flex-col gap-4 mt-4'>
				{actions &&
					actions?.map((action, index) => (
						<motion.div key={index} variants={itemVariants}>
							<Button {...action.options}>{action.label}</Button>
						</motion.div>
					))}
			</motion.div>
		</motion.div>
	)
}
