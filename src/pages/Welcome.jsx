import { motion } from 'framer-motion'
import Button from '../components/buttons/Button'
import { useNavigate, useLocation } from 'react-router-dom'
import { useEffectOnce, useTitle } from 'react-use'

export default function Welcome({ setWelcome }) {
	const navigate = useNavigate()
	const { pathname } = useLocation()

	function handleGetStarted() {
		setWelcome(true)
	}

	useEffectOnce(() => {
		if (pathname !== '/') {
			navigate('/')

			setTimeout(() => {
				navigate(0)
			}, 0)
		}
	})

	useTitle('Velkommen – Landrup Dans')

	return (
		<div
			className='relative bg-[url("./splash-image.jpg")] bg-cover h-screen w-screen flex flex-col items-center'
			style={{ backgroundPosition: 'center' }}
		>
			<div className='absolute left-0 top-1/2 flex flex-col gap-2'>
				<h1 className='flex flex-col pl-11 pr-4'>
					<span className='font-display-header text-white/25 font-bold uppercase text-[38px] text-stroke-2 leading-none tracking-tighter'>
						Landrup
					</span>
					<span className='block font-display text-[74px] text-[#E856EB] uppercase text-stroke-1 leading-none -mt-3'>
						Dans
					</span>
				</h1>
				<div className=' w-full h-3 bg-[#913693] shadow-[0_4px_4px_#00000040]' />
			</div>
			<motion.div
				initial={{ y: 'calc(100% + 3.5rem)', opacity: 0 }}
				animate={{
					y: 0,
					opacity: 1,
					transition: {
						type: 'spring',
						stiffness: 500,
						damping: 50,
						opacity: {
							delay: 1,
							duration: 0.5,
							ease: 'easeOut',
						},
						delay: 1.5,
					},
				}}
				className='fixed bottom-14'
			>
				<Button onClick={handleGetStarted}>Kom i gang</Button>
			</motion.div>
		</div>
	)
}
