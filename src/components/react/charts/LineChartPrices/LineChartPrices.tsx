import type { Value } from "@/models/api.model";
import { transformToTwoDigits } from "@/utils/utils";
import { LineChart } from "@mui/x-charts/LineChart";
import type { AxisValueFormatterContext } from "node_modules/@mui/x-charts/models/axis";

interface LineChartPricesProps {
	prices: Value[];
}

export default function LineChartPrices({ prices }: LineChartPricesProps) {
	const pricesArray = prices.map((price) => price.value ?? null) ?? [];
	const datesArray = prices.map((price) => new Date(price.datetime ?? ""));
	const dateOfChart = datesArray[0];

	const valueTimeFormatter = (date: Date, context: AxisValueFormatterContext) => {
		if (context.location === "tick") {
			return transformToTwoDigits(date.getHours());
		} else {
			const dayMonthYear = date.toLocaleDateString("es-ES", {
				year: "numeric",
				month: "2-digit",
				day: "2-digit",
			});
			const hours = date.getHours();
			const minutes = date.getMinutes();

			return `${dayMonthYear} ${transformToTwoDigits(hours)}:${transformToTwoDigits(minutes)}`;
		}
	};

	return (
		<LineChart
			xAxis={[
				{
					id: "Horas",
					label: dateOfChart.toLocaleDateString(),
					scaleType: "time",
					data: datesArray,
					valueFormatter: valueTimeFormatter,
				},
			]}
			series={[
				{
					id: "Precios",
					label: "€/kWh",
					curve: "linear",
					data: pricesArray,
					showMark: false,

					valueFormatter: (v: number | null) =>
						new Intl.NumberFormat("es-ES", {
							minimumFractionDigits: 5,
							maximumFractionDigits: 5,
						}).format(v ?? 0),
				},
			]}
			grid={{ horizontal: true }}
			height={400}
		/>
	);
}
