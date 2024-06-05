import type { Value } from "@/models/api.model";

/**
 * Transforma un número a un string de dos dígitos.
 * @param num El número a transformar.
 * @returns Un string de dos dígitos.
 */
export function transformToTwoDigits(num: number): string {
	return num.toString().padStart(2, "0");
}

/**
 * Transforma un número a un string de cinco decimales.
 * @param num El número a transformar.
 * @returns Un string de cinco decimales.
 */
export function transformToFiveDecimals(num: number | undefined): string {
	if (!num) return "---";
	return num.toFixed(5);
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

/**
 * Calcula la mediana de una lista de precios de luz.
 *
 * Devuelve la mediana de una lista de precios de luz. Para ello, primero
 * encuentra el precio máximo y mínimo en la lista, y luego devuelve la
 * media de ambos valores.
 *
 * @param preciosLuz - La lista de precios de luz.
 * @returns La mediana de la lista de precios de luz.
 */
export function getMedianaPreciosLuz(preciosLuz: Value[]): number {
	let maxPrecioLuz = -Infinity;
	let minPrecioLuz = Infinity;

	// Recorrer la lista para encontrar el precio máximo y mínimo
	for (const precio of preciosLuz) {
		if (precio.value !== undefined && precio.value !== null) {
			if (precio.value > maxPrecioLuz) {
				maxPrecioLuz = precio.value;
			}
			if (precio.value < minPrecioLuz) {
				minPrecioLuz = precio.value;
			}
		}
	}

	// Calcular la mediana
	return (maxPrecioLuz + minPrecioLuz) / 2;
}
