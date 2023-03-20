export function isInstructor(user, activity) {
	return user?.role === 'instructor' && user?.id === activity.instructorId
}

export function isWithinAge(user, activity) {
	return user?.age <= activity?.maxAge && user?.age >= activity.minAge
}

export function activityIsFull(activity) {
	activity?.users.length >= activity?.maxParticipants
}

export function hasActivityThisDay(user, activity) {
	return user?.activities.find(item => item.weekday === activity?.weekday)
		? true
		: false
}

export function hasSignedUp(user, activity) {
	return user?.activities.map(item => item.id).includes(activity?.id)
}
