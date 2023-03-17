import Button from '../components/buttons/Button'
import CalendarList from '../components/lists/CalendarList'
import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthProvider'
import { motion } from 'framer-motion'

export default function Calendar() {
	const { auth, setAuth } = useContext(AuthContext)

	function signOut() {
		setAuth({ action: 'delete' })
	}

	return (
		<div className='px-6 pt-8 pb-20'>
			<h1 className='text-elevated text-4xl font-semibold px-2 mb-8'>
				Calendar
			</h1>
			<CalendarList />

			{auth.userId && (
				<motion.div
					variants={{
						hidden: { opacity: 0, y: 24, scale: 0.75 },
						visible: {
							opacity: 1,
							y: 0,
							scale: 1,
							transition: {
								delay: 1,
								type: 'spring',
								stiffness: 500,
								damping: 50,
							},
						},
					}}
					initial='hidden'
					animate='visible'
					className='flex justify-center mt-12'
				>
					<Button onClick={signOut} type='secondary'>
						Log ud
					</Button>
					{/* // TODO: Brugeren skal kunne logge ud */}
				</motion.div>
			)}
		</div>
	)
}
