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
import SignInProvider from './contexts/SignInProvider'

function App() {
	const [authCookie] = useCookie('auth')
	const [showWelcome, setShowWelcome] = useSessionStorage('welcome')

	function showWelcomeScreen() {
		if (authCookie || showWelcome) return false
		return true
	}

	const router = createBrowserRouter([
		{
			element: showWelcomeScreen() ? (
				<Welcome setWelcome={setShowWelcome} />
			) : (
				<Layout />
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
					path: '/calendar/roster/:id',
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
			<SignInProvider>
				<RouterProvider router={router} />
			</SignInProvider>
		</AuthProvider>
	)
}

export default App
