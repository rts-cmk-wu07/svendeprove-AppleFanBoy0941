import { AnimatePresence, motion } from 'framer-motion'
import { Search } from 'lucide-react'
import { useState } from 'react'

export default function Input({ search, errorMessage, ...props }) {
	const [focus, setFocus] = useState(false)
	return (
		<label className='flex flex-col'>
			<div
				className={`flex items-center gap-2 ${
					search ? 'bg-elevated/10' : 'bg-elevated'
				}  border-2 border-transparent focus:border-primary transition pr-3`}
			>
				<input
					className={`flex-grow py-3 pl-5 pr-2 bg-transparent placeholder:text-[#999999] focus:outline-none ${
						search ? 'text-elevated' : 'text-text'
					}`}
					{...props}
				/>
				{search && <Search className='flex-shrink-0 text-elevated' />}
			</div>
			<AnimatePresence>
				{errorMessage && (
					<motion.p
						initial={{ opacity: 0, y: -10, height: 0 }}
						animate={{ opacity: 1, y: 0, height: 'fit-content' }}
						exit={{ opacity: 0, y: -10, height: 0 }}
						className='text-red-500 px-5 drop-shadow-lg'
					>
						{errorMessage}
					</motion.p>
				)}
			</AnimatePresence>
		</label>
	)
}
