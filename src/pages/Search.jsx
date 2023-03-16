import ActivitiesList from '../components/lists/ActivitiesList'
import Input from '../components/sub-components/Input'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { SearchIcon } from 'lucide-react'

export default function Search() {
	const [search, setSearch] = useState('')

	return (
		<div className='px-6 pt-8 pb-20 flex flex-col gap-12'>
			<header>
				<h1 className='text-elevated text-4xl font-semibold px-2 mb-4'>Søg</h1>
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
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1, transition: { delay: 0.25 } }}
						exit={{ opacity: 0 }}
						className=' text-elevated/50 flex flex-col items-center gap-2'
					>
						<SearchIcon size={48} className='text-elevated' opacity={0.5} />
						<p className='text-xl'>Søg efter aktiviteter</p>
						<p className='opacity-50 text-center'>
							Find din næste aktivitet her, søg efter både navn, tidspunkt og
							alder.
						</p>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}
