import { useTitle } from 'react-use'
import ActivitiesList from '../components/lists/ActivitiesList'
import SiteTitle from '../components/sub-components/SiteTitle'

export default function Activities() {
	useTitle('Aktiviteter – Landrup Dans')

	return (
		<div className='px-6 pt-8 pb-20'>
			<SiteTitle title='Aktiviteter' />
			<ActivitiesList />
		</div>
	)
}
