export default function Welcome() {
	return (
		<div
			className='relative bg-[url("./splash-image.jpg")] bg-cover h-screen w-screen'
			style={{ backgroundPosition: 'center' }}
		>
			<div className='absolute left-0 top-1/2 flex flex-col gap-2'>
				<h1 className='flex flex-col pl-11 pr-4'>
					<span className='font-display-header text-white/25 font-bold uppercase text-[38px] text-stroke-2 leading-none tracking-tighter'>
						Landrup
					</span>
					<span className='block font-display text-[74px] text-[#E856EB] uppercase text-stroke-1 leading-none -mt-3'>
						Dans
					</span>
				</h1>
				<div className=' w-full h-3 bg-[#913693] shadow-[0_4px_4px_#00000040]' />
			</div>
		</div>
	)
}
