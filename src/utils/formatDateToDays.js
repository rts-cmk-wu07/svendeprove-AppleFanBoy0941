export default function formatDateToDays(date) {
	return Math.round(((date - Date.now()) / (1000 * 60 * 60 * 24)) * 100) / 100
}
