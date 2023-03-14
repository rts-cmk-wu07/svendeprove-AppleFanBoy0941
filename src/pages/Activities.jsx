import ActivitiesList from '../components/lists/ActivitiesList'

export default function Activities() {
	return (
		<div className='px-6 pt-8 pb-20'>
			<h1 className='text-elevated text-4xl font-semibold px-2 mb-8'>
				Aktiviteter
			</h1>
			<ActivitiesList />
		</div>
	)
}
