import { Home, Search, Calendar } from 'lucide-react'
import NavigationLink from '../components/sub-components/NavigationLink'

export default function Navigation() {
	const links = [
		{
			name: 'Hjem',
			path: '/',
			icon: <Home />,
		},
		{
			name: 'Søg',
			path: '/search',
			icon: <Search />,
		},
		{
			name: 'Kalender',
			path: '/calendar',
			icon: <Calendar />,
		},
	]
	return (
		<ul className='fixed z-50 bottom-0 right-0 left-0 bg-elevated h-16 flex px-6 items-center justify-between'>
			{links.map(link => (
				<li key={link.name}>
					<NavigationLink link={link} />
				</li>
			))}
		</ul>
	)
}
