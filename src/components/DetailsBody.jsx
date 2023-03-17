export default function DetailsBody({ activity }) {
	return (
		<div className='flex-grow flex-shrink-0 h-2/5 pt-4 px-6 pb-12 text-elevated gap-2 flex flex-col overflow-y-auto'>
			<header>
				<h1 className='text-xl font-bold'>{activity?.name}</h1>
				<div className='flex justify-between flex-wrap'>
					<p>
						{activity?.minAge}-{activity?.maxAge} år
					</p>
					<p>
						{activity.weekday} {activity.time}
					</p>
				</div>
			</header>
			<p>{activity?.description}</p>
		</div>
	)
}
