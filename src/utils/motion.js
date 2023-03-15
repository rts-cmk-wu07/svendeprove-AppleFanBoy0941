export const animatedList = {
	initial: {
		opacity: 0,
	},
	animate: {
		opacity: 1,
		transition: {
			delayChildren: 2,
			staggerChildren: 0.5,
		},
	},
	exit: {
		opacity: 0,
		transition: { delay: 0.2 },
	},
}

export const animatedListItem = {
	initial: {
		opacity: 1,
		y: 24,
	},
	animate: {
		opacity: 1,
		y: 0,
		filter: 'blur(0px)',
		transition: {
			type: 'spring',
			stiffness: 500,
			damping: 50,
			duration: 1.5,
			opacity: { duration: 0.5, delay: 1, ease: 'easeOut' },
			filter: { duration: 0.5, delay: 1, ease: 'easeOut' },
		},
	},
	exit: {
		opacity: 0,
		scale: 0.8,
		filter: 'blur(12px)',
		transition: { ease: 'easeIn' },
	},
}
