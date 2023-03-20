import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import useCookie from 'react-use-cookie'
import useSessionStorage from './hooks/useSessionStorage'
import React, { Suspense } from 'react'
import RotatingLoader from './components/loaders/RotatingLoader'

// Import Layout component
import Layout from './Layout'

// Import Pages
const Welcome = React.lazy(() => import('./pages/Welcome'))
const Activities = React.lazy(() => import('./pages/Activities'))
const ActivityDetails = React.lazy(() => import('./pages/ActivityDetails'))
const Calendar = React.lazy(() => import('./pages/Calendar'))
const Search = React.lazy(() => import('./pages/Search'))
const TeamOverview = React.lazy(() => import('./pages/TeamOverview'))
const NotFound = React.lazy(() => import('./pages/NotFound'))

// Import Contexts
import AuthProvider from './contexts/AuthProvider'
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
				<Suspense
					fallback={
						<div className='flex justify-center pt-16'>
							<RotatingLoader />
						</div>
					}
				>
					<RouterProvider router={router} />
				</Suspense>
			</SignInProvider>
		</AuthProvider>
	)
}

export default App
