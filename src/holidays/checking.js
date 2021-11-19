const isChristmasToday = () => {
	let date = new Date();

	if ((date.getMonth() === 11 && date.getDate() === 24) ||
		(date.getMonth() === 11 && date.getDate() === 25) ||
		(date.getMonth() === 11 && date.getDate() === 26)) {

		return true;

	}

	return false;
}
const isNewYearToday = () => {
	return true;
	let date = new Date();

	if ((date.getMonth() === 11 && date.getDate() === 31) ||
		(date.getMonth() === 0 && date.getDate() === 1)) {
		
		return true;
	}

	return false;
}
const isPDLToday = () => {
	let date = new Date();

	if ((date.getMonth() === 10 && date.getDate() === 18)) {
		return true;
	}

	return false;
}
const isJaniToday = () => {
	let date = new Date();

	if ((date.getMonth() === 5 && date.getDate() === 24)) {
		return true;
	}

	return false;
}

const isAHolidayToday = () => {
	if (isChristmasToday() ||
		isNewYearToday() ||
		isPDLToday() ||
		isJaniToday()) {

		return true;
	}

	return false;
}