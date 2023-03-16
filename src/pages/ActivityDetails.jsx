import DetailsHeader from '../components/DetailsHeader'
import { useParams } from 'react-router-dom'
import useAxios from '../hooks/useAxios'
import DetailsBody from '../components/DetailsBody'
import DetailLoader from '../components/loaders/DetailLoader'
import { AnimatePresence, motion } from 'framer-motion'
import Info from '../components/Info'
import { InfoIcon } from 'lucide-react'

export default function ActivityDetails() {
	const { id } = useParams()

	const { data, loading, error } = useAxios(`activities/${id}`, true)

	return (
		<>
			<AnimatePresence mode='popLayout'>
				{loading ? (
					<motion.div
						key='loader'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
					>
						<DetailLoader />
					</motion.div>
				) : (
					<motion.div
						key='data'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className='flex flex-col h-screen'
					>
						{data ? (
							<>
								<DetailsHeader activity={data} />
								<DetailsBody activity={data} />
							</>
						) : (
							<Info
								extraPadding
								icon='AlertCircle'
								title='Fandt ikke aktivitet'
								body={[
									'Vi kunne desværre ikke finde aktiviteten du ledte efter',
									'Men du kan nemt komme tilbage til hjem her',
								]}
								actions={[
									{
										label: 'Gå til hjem',
										options: { type: 'secondary', to: '/' },
									},
								]}
							/>
						)}
					</motion.div>
				)}
			</AnimatePresence>
		</>
	)
}
