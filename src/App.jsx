import {
	createBrowserRouter,
	RouterProvider,
	ScrollRestoration,
} from 'react-router-dom'
import useCookie from 'react-use-cookie'
import useSessionStorage from './hooks/useSessionStorage'

// Import Layout component
import Layout from './Layout'

// Import Pages
import Welcome from './pages/Welcome'
import Activities from './pages/Activities'
import ActivityDetails from './pages/ActivityDetails'
import Calendar from './pages/Calendar'
import Search from './pages/Search'

// Import Contexts
import AuthProvider from './contexts/AuthProvider'
import TeamOverview from './pages/TeamOverview'
import { AnimatePresence, motion } from 'framer-motion'
import NotFound from './pages/NotFound'

function App() {
	const [authCookie] = useCookie('auth')
	const [showWelcome, setShowWelcome] = useSessionStorage('welcome')

	function showWelcomeScreen() {
		if (authCookie || showWelcome) return false
		return true
	}

	const router = createBrowserRouter([
		{
			element: (
				<AnimatePresence mode='wait'>
					{showWelcomeScreen() ? (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1, filter: 'blur(0rem)' }}
							exit={{ opacity: 0, filter: 'blur(1rem)' }}
						>
							<Welcome setWelcome={setShowWelcome} />
						</motion.div>
					) : (
						<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
							<Layout />
						</motion.div>
					)}
				</AnimatePresence>
			),
			children: [
				{
					path: '/',
					element: <Activities />,
				},
				{
					path: '/activity/:id',
					element: <ActivityDetails />,
				},
				{
					path: '/calendar',
					element: <Calendar />,
				},
				{
					path: '/search',
					element: <Search />,
				},
				{
					path: '/calendar/team/:id',
					element: <TeamOverview />,
				},
				{
					path: '*',
					element: <NotFound />,
				},
			],
		},
	])

	return (
		<AuthProvider>
			<RouterProvider router={router} />
		</AuthProvider>
	)
}

export default App
