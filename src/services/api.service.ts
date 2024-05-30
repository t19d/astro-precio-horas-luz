import { type Data, type ElectricityPrices, type Included, type Value } from "@/models/api.model";
import { transformToTwoDigits } from "@/utils/utils";

const URL_PRICES_REAL_TIME_API = import.meta.env.URL_PRICES_REAL_TIME_API;

class ApiService {
	async getElectricityPricesDayAPI(date: Date = new Date()): Promise<Value[]> {
		// Tarifa.peninsular: 8741,
		// Tarifa.canarias: 8742,
		// Tarifa.baleares: 8743,
		// Tarifa.ceuta: 8744,
		// Tarifa.melilla: 8745,
		const rateType = "8741"; // TODO: Pass as parameter
		const dateUrl = `${date.getFullYear()}-${transformToTwoDigits(date.getMonth() + 1)}-${transformToTwoDigits(date.getDate())}`;
		const url = `${URL_PRICES_REAL_TIME_API}?start_date=${dateUrl}T00:00&end_date=${dateUrl}T23:59&time_trunc=hour&geo_ids=${rateType}`;

		const response = await fetch(url, this.getFetchOptions());

		if (response.ok) {
			const data = (await response.json()) as ElectricityPrices;
			const electricityPrices = this.getElectricityPricesPVPC(data);
			return electricityPrices;
		} else {
			throw new Error(`Error fetching data: ${response.statusText}`);
		}
	}

	private getElectricityPricesPVPC(electricityPrices: ElectricityPrices): Value[] {
		const included = electricityPrices.included?.find((included) => included.id === "1001");
		return included?.attributes?.values ?? [];
	}

	private getFetchOptions(method: "GET" = "GET"): RequestInit {
		return {
			method,
			headers: {
				"Content-Type": "application/json",
			},
		};
	}
}

const apiService = new ApiService();
export default apiService;
