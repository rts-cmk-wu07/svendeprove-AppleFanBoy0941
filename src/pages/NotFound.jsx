import { Link } from 'react-router-dom'

export default function NotFound() {
	return (
		<div className='flex flex-col gap-2 items-center justify-center h-screen text-elevated/50 p-6 text-center'>
			<h1 className='text-4xl font-bold text-elevated mb-4'>404</h1>
			<p>Vi kunne desværre ikke finde denne side.</p>
			<p>Men frygt ikke, du kan nemt komme tilbage på sporet her</p>
			<Link
				to='/'
				className='bg-elevated text-text h-[54px] w-[249px] rounded-xl shadow-[3px_4px_4px_#00000040] flex items-center justify-center mt-4'
			>
				Gå til forsiden
			</Link>
		</div>
	)
}
