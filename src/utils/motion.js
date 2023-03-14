export const animatedList = {
	initial: {
		opacity: 0,
	},
	animate: {
		opacity: 1,
		transition: {
			delayChildren: 0.2,
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
		opacity: 0,
		y: 24,
	},
	animate: {
		opacity: 1,
		y: 0,
		filter: 'blur(0px)',
	},
	exit: {
		opacity: 0,
		scale: 0.8,
		filter: 'blur(12px)',
		transition: { ease: 'easeIn' },
	},
}
