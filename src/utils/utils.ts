/**
 * Transforma un número a un string de dos dígitos.
 * @param num El número a transformar.
 * @returns Un string de dos dígitos.
 */
export function transformToTwoDigits(num: number): string {
	return num.toString().padStart(2, "0");
}

/**
 * Obtiene el día de la semana pasada basado en la fecha actual.
 * @returns Un objeto Date representando el día de la semana pasada.
 */
export function getPreviousWeekDay(): Date {
	const today = new Date();
	const previousWeekDay = new Date(today);
	previousWeekDay.setDate(today.getDate() - 7);
	return previousWeekDay;
}

/**
 * Obtiene el primer día del mes pasado.
 * @returns Un objeto Date representando el primer día del mes pasado.
 */
export function getPreviousMonthPlusOneDay(): Date {
	const today = new Date();
	const previousMonth = new Date(today);
	previousMonth.setMonth(today.getMonth() - 1);
	previousMonth.setDate(previousMonth.getDate() + 1);
	return previousMonth;
}
