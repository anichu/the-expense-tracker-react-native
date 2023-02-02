export function getFormateDate(date) {
	let convertToDate = new Date(date);
	return `${convertToDate?.getFullYear()}-${
		convertToDate?.getMonth() + 1
	}-${convertToDate?.getDate()}`;
}

export function getDateMinusDays(date, days) {
	const countDate = new Date(
		date?.getFullYear(),
		date?.getMonth(),
		date?.getDate() - days
	);
	return countDate;
}
