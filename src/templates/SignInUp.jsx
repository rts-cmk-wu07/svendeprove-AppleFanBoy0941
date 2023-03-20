import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import bgImage from '../assets/images/splash-image.jpg'
import BackButton from '../components/buttons/BackButton'
import { useState } from 'react'
import SignIn from './SignIn'
import SignUp from './SignUp'

export default function SignInUp({ isOpen, setIsOpen }) {
	const [activeScreen, setActiveScreen] = useState('signIn')

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className='bg-gradient-to-b from-[#E3C8E7] via-[#FBF6FC] to-[#E3C8E7] fixed inset-0 z-50'
				>
					<motion.img
						src={bgImage}
						className='h-full w-full object-cover'
						alt='Landrup Dans'
						initial={{ opacity: 0 }}
						animate={{
							opacity: 1,
							transition: { delay: 0.25, duration: 1, ease: 'easeOut' },
						}}
					/>
					<motion.div
						className='absolute inset-0 flex flex-col justify-center px-6'
						initial={false}
						animate={{
							backgroundImage:
								'linear-gradient(-30deg, transparent 0% 28%, #5E2E5380 28% 80%, transparent 80% 100%)',
							backgroundSize: activeScreen === 'signUp' ? '675%' : '100%',
							backgroundPosition: 'center',
						}}
					>
						{activeScreen === 'signIn' ? (
							<motion.div
								key='signIn'
								initial={{ opacity: 0, y: 64 }}
								animate={{ opacity: 1, y: 0 }}
							>
								<SignIn setIsOpen={setIsOpen} />
							</motion.div>
						) : (
							<motion.div
								key='signOut'
								initial={{ opacity: 0, y: 64 }}
								animate={{ opacity: 1, y: 0 }}
							>
								<SignUp setIsOpen={setIsOpen} />
							</motion.div>
						)}
					</motion.div>
					<BackButton
						placement='right'
						onClick={() => setIsOpen(false)}
						delay={1.5}
					>
						<X />
					</BackButton>
					<div className='fixed bottom-6 left-0 right-0 z-[100] flex justify-center'>
						<motion.button
							key={activeScreen}
							initial={{ y: 32, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							onClick={() =>
								setActiveScreen(activeScreen === 'signUp' ? 'signIn' : 'signUp')
							}
							className='flex flex-col items-center text-text/50'
						>
							{activeScreen === 'signIn'
								? 'Har ikke en profil endnu?'
								: 'Har allerede en profil?'}

							<span className='font-bold text-background'>
								{activeScreen === 'signIn' ? 'Opret profil' : 'Log ind'}
							</span>
						</motion.button>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	)
}
