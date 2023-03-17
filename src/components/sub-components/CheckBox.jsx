import { AnimatePresence, motion } from 'framer-motion'
import { Check } from 'lucide-react'

export default function CheckBox({ label, value, setValue }) {
	return (
		<label className='flex items-center gap-2'>
			<input
				type='checkbox'
				className='form-checkbox h-5 w-5 text-primary hidden'
				checked={value}
				onChange={() => setValue(!value)}
			/>
			<motion.div
				className={`h-6 w-6 flex items-center justify-center rounded-full ${
					value ? 'bg-primary' : 'bg-elevated'
				} transition`}
			>
				<AnimatePresence>
					{value && (
						<motion.div
							initial={{ scale: 0, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0, opacity: 0 }}
							className='p-1 w-full h-full'
						>
							<Check className='text-white h-full w-full' strokeWidth={4} />
						</motion.div>
					)}
				</AnimatePresence>
			</motion.div>
			<p className='text-elevated'>{label}</p>
		</label>
	)
}
