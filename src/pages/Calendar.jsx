import Button from '../components/buttons/Button'
import CalendarList from '../components/lists/CalendarList'
import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthProvider'
import { motion } from 'framer-motion'
import { useTitle } from 'react-use'
import SiteTitle from '../components/sub-components/SiteTitle'

export default function Calendar() {
	useTitle('Kalender – Landrup Dans')

	const { auth, setAuth } = useContext(AuthContext)

	function signOut() {
		setAuth({ action: 'delete' })
	}

	return (
		<div className='px-6 pt-8 pb-20'>
			<SiteTitle title='Kalender' />
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
					<Button onClick={signOut} color='secondary'>
						Log ud
					</Button>
				</motion.div>
			)}
		</div>
	)
}
