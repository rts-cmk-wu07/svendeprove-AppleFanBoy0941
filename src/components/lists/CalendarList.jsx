import useAxios from '../../hooks/useAxios'
import CalendarItem from './CalendarItem'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthProvider'
import { SignInContext } from '../../contexts/SignInProvider'
import RotatingLoader from '../loaders/RotatingLoader'
import Info from '../Info'
import { useUnmount } from 'react-use'

export default function CalendarList() {
	const { auth } = useContext(AuthContext)
	const { setSignInOpen } = useContext(SignInContext)
	const { userId, role } = auth

	const { data, loading } = useAxios(
		role === 'instructor' ? 'activities' : 'users/' + userId
	)

	function processItems() {
		if (!data) return []
		if (role !== 'instructor') return data.activities

		return data?.filter(item => item.instructorId === userId)
	}

	return (
		<div>
			{!userId ? (
				<Info
					icon='CalendarX2'
					title='Det ser ud til du ikke er logget ind'
					body={[
						'For at se dine aktiviteter skal du være logget ind',
						'Men fortvivl ikke, vi har gjort det nemt for dig at komme i gang her',
					]}
					actions={[
						{
							label: 'Log ind her',
							options: {
								color: 'secondary',
								onClick: () => setSignInOpen(true),
							},
						},
					]}
				/>
			) : (
				<>
					{loading ? (
						<div className='flex justify-center pt-16'>
							<RotatingLoader delay={0.5} />
						</div>
					) : processItems()?.length > 0 ? (
						<ul className='flex flex-col gap-4'>
							{processItems().map((item, index) => (
								<CalendarItem key={item.id} activity={item} index={index} />
							))}
						</ul>
					) : (
						<Info
							icon='CalendarSearch'
							title={
								role !== 'instructor'
									? 'Det ser ud til du ikke er tilmeldt nogle hold endnu'
									: 'Vi kunne ikke finde dine hold'
							}
							body={
								role !== 'instructor' && [
									'Men lad os finde dig et hold med det samme',
								]
							}
							actions={
								role !== 'instructor' && [
									{
										label: 'Find et hold',
										options: {
											color: 'secondary',
											to: '/',
										},
									},
								]
							}
						/>
					)}
				</>
			)}
		</div>
	)
}
