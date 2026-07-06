export function formatDuration(startTime: Date, endTime: Date): string {
	const diffMins = Math.floor(
		(endTime.getTime() - startTime.getTime()) / (1000 * 60),
	);

	const hours = Math.floor(diffMins / 60);
	const minutes = diffMins % 60;

	if (hours > 0 && minutes > 0) return `${hours}h ${minutes}m`;
	if (hours > 0) return `${hours}h`;
	return `${minutes} mins`;
}
