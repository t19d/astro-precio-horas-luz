import type { Value } from "@/models/api.model";

export function transformToTwoDigits(num: number): string {
	return num.toString().padStart(2, "0");
}

export function transformToFiveDecimals(num: number | undefined): string {
	if (num === undefined || num === null) return "---";
	return num.toFixed(5);
}

export function transformToKWH(price: number | undefined): string {
	if (price === undefined || price === null) return "- €/kWh";
	return `${price.toFixed(5)} €/kWh`;
}

export function formatDateDDMMYYYY(date: Date): string {
	return `${transformToTwoDigits(date.getDate())}-${transformToTwoDigits(date.getMonth() + 1)}-${date.getFullYear()}`;
}

export function getHourFromDatetime(datetime: string | undefined): number {
	if (!datetime) return 0;
	return new Date(datetime).getHours();
}

export function parseHourRange(datetime: string | undefined): string {
	if (!datetime) return "--h — --h";
	const date = new Date(datetime);
	const startHour = transformToTwoDigits(date.getHours());
	const endHour = transformToTwoDigits((date.getHours() + 1) % 24);
	return `${startHour}h — ${endHour}h`;
}

export function getPreviousWeekDay(): Date {
	const today = new Date();
	const previousWeekDay = new Date(today);
	previousWeekDay.setDate(today.getDate() - 7);
	return previousWeekDay;
}

export function getPreviousMonthPlusOneDay(): Date {
	const today = new Date();
	const previousMonth = new Date(today);
	previousMonth.setMonth(today.getMonth() - 1);
	previousMonth.setDate(previousMonth.getDate() + 1);
	return previousMonth;
}

export function getMedianaPreciosLuz(preciosLuz: Value[]): number {
	let maxPrecioLuz = -Infinity;
	let minPrecioLuz = Infinity;

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

	return (maxPrecioLuz + minPrecioLuz) / 2;
}

export function getMediaPreciosLuz(preciosLuz: Value[]): number {
	if (preciosLuz.length === 0) return 0;
	const sum = preciosLuz.reduce((acc, p) => acc + (p.value ?? 0), 0);
	return sum / preciosLuz.length;
}

export function getActualHourPrice(prices: Value[]): Value | undefined {
	const currentHour = new Date().getHours();
	return prices.find((p) => {
		if (!p.datetime) return false;
		return new Date(p.datetime).getHours() === currentHour;
	});
}

export function getNextBestHourPrice(prices: Value[]): Value | undefined {
	const currentHour = new Date().getHours();
	const futureHours = prices.filter((p) => {
		if (!p.datetime) return false;
		return new Date(p.datetime).getHours() > currentHour;
	});

	if (futureHours.length === 0) return undefined;

	return futureHours.reduce((best, current) => {
		if (best.value === undefined) return current;
		if (current.value === undefined) return best;
		return current.value < best.value ? current : best;
	});
}

export function getCurrentHour(): number {
	return new Date().getHours();
}
