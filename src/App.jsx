import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import useCookie from 'react-use-cookie'
import useSessionStorage from './hooks/useSessionStorage'

// Import Layout component
import Layout from './Layout'

// Import Pages

// Import Contexts
import AuthProvider from './contexts/AuthProvider'
import Welcome from './pages/Welcome'
import Activities from './pages/Activities'

function App() {
	const [authCookie, setAuthCookie] = useCookie('auth')
	const [showWelcome, setShowWelcome] = useSessionStorage('auth')

	function showWelcomeScreen() {
		if (authCookie || showWelcome) return false
		return true
	}

	const router = createBrowserRouter([
		{
			path: '/',
			element: showWelcomeScreen() ? <Welcome /> : <Layout />,
			children: [
				{
					index: true,
					element: <Activities />,
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
