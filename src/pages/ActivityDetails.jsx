import DetailsHeader from '../components/DetailsHeader'
import { useParams } from 'react-router-dom'
import useAxios from '../hooks/useAxios'
import DetailsBody from '../components/DetailsBody'

export default function ActivityDetails() {
	const { id } = useParams()

	const { data, loading, error } = useAxios(`activities/${id}`, true)
	return (
		<div className='flex flex-col h-screen'>
			<DetailsHeader activity={data} />
			{/* <div className='flex-grow flex-shrink-0 h-2/5'></div> */}
			<DetailsBody activity={data} />
		</div>
	)
}
