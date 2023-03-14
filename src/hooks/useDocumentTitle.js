import { useRef, useEffect } from 'react'

export default function useDocumentTitle(title) {
	const defaultTitle = useRef(document.title)

	useEffect(() => {
		document.title = title
	}, [title])

	useEffect(() => {
		return () => {
			document.title = defaultTitle.current
		}
	}, [])
}
