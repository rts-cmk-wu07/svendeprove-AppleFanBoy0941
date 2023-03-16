import useAxios from '../../hooks/useAxios'
import CalendarItem from './CalendarItem'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthProvider'
import { CalendarSearch, CalendarX2 } from 'lucide-react'
import Button from '../buttons/Button'
import { SignInContext } from '../../contexts/SignInProvider'
import RotatingLoader from '../loaders/RotatingLoader'

export default function CalendarList() {
	const { auth } = useContext(AuthContext)
	const { setSignInOpen } = useContext(SignInContext)
	const { userId, role } = auth

	const { data, loading, error } = useAxios(
		role === 'instructor' ? 'activities' : 'users/' + userId
	)

	function processItems() {
		if (!data) return []
		if (role !== 'instructor') return data.activities

		return data.filter(item => item.instructorId === userId)
	}

	return (
		<div>
			{!userId ? (
				<div className='flex flex-col items-center mt-16 gap-4 text-elevated/50 text-center px-4'>
					<CalendarX2 size={48} className='text-elevated' opacity={0.5} />
					<h2 className='text-xl'>Det ser ud til du ikke er logget ind</h2>
					<p>For at se dine aktiviteter skal du være logget ind.</p>
					<p>
						Men fortvivl ikke, vi har gjort det nemt for dig at komme i gang
						her.
					</p>
					<Button
						onClick={() => setSignInOpen(true)}
						type='secondary'
						additionalClass='mt-4'
					>
						Log ind her
					</Button>
				</div>
			) : (
				<>
					{loading ? (
						<div className='flex justify-center pt-16'>
							<RotatingLoader />
						</div>
					) : processItems().length > 0 ? (
						<ul>
							{processItems().map((item, index) => (
								<CalendarItem key={item.id} activity={item} index={index} />
							))}
						</ul>
					) : (
						<div className='text-elevated/50 flex flex-col items-center text-center px-4 mt-16 gap-4'>
							<CalendarSearch
								size={48}
								className='text-elevated'
								opacity={0.5}
							/>
							<h2 className='text-xl'>
								{role !== 'instructor'
									? 'Det ser ud til du ikke er tilmeldt nogle hold endnu'
									: 'Vi kunne ikke finde dine hold'}
							</h2>
							{role !== 'instructor' && (
								<>
									<p>Men lad os finde dig et hold.</p>
									<Button to='/' type='secondary' additionalClass='mt-4'>
										Find et hold
									</Button>
								</>
							)}
						</div>
					)}
				</>
			)}
		</div>
	)
}
