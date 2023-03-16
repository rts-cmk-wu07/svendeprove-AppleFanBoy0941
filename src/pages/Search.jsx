import ActivitiesList from '../components/lists/ActivitiesList'
import Input from '../components/sub-components/Input'
import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Info from '../components/Info'
import SiteTitle from '../components/sub-components/SiteTitle'

export default function Search() {
	const [search, setSearch] = useState('')

	return (
		<div className='px-6 pt-8 pb-20 flex flex-col gap-12'>
			<header>
				{/* <h1 className='text-elevated text-4xl font-semibold px-2 mb-4'>Søg</h1> */}
				<SiteTitle title='Søg' />
				<Input
					search
					placeholder='Søg efter aktiviteter'
					value={search}
					onChange={e => setSearch(e.target.value)}
				/>
			</header>
			<AnimatePresence>
				{search ? (
					<ActivitiesList filter={search} />
				) : (
					<Info
						icon='Search'
						title='Søg efter aktiviteter'
						body={[
							'Find din næste aktivitet her, søg efter både navn tidspunkt og alder',
						]}
					/>
				)}
			</AnimatePresence>
		</div>
	)
}
