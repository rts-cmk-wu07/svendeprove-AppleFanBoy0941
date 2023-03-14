import { createBrowserRouter, RouterProvider } from 'react-router-dom'
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

function App() {
	const [authCookie, setAuthCookie] = useCookie('auth')
	const [showWelcome, setShowWelcome] = useSessionStorage('auth')

	function showWelcomeScreen() {
		if (authCookie || showWelcome) return false
		return true
	}

	const router = createBrowserRouter([
		{
			element: showWelcomeScreen() ? <Welcome /> : <Layout />,
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