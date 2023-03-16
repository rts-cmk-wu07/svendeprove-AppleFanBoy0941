import useAxios from '../hooks/useAxios'
import { useParams, useLocation } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthProvider'
import RotatingLoader from '../components/loaders/RotatingLoader'

export default function TeamOverview() {
	const location = useLocation()
	const { state } = location
	const { id } = useParams()
	const { auth } = useContext(AuthContext)
	const { userId } = auth
	const { data, loading, error } = useAxios(`users/${userId}/roster/${id}`)

	console.log(loading)

	return (
		<div className='px-6 pt-8 pb-20'>
			<h1 className='text-elevated text-4xl font-semibold px-2 mb-8'>
				{state.activityName || 'Team Roster'}
			</h1>
			{loading ? (
				<div className='flex justify-center pt-16'>
					<RotatingLoader />
				</div>
			) : (
				<ul className='px-2 text-elevated/75 flex flex-col gap-4'>
					{data?.map(item => (
						<li key={item.firstname + item.lastname}>
							{console.log(item)}
							{item.firstname} {item.lastname}
						</li>
					))}
				</ul>
			)}
		</div>
	)
}
