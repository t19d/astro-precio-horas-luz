import type { Value } from "@/models/api.model";
import { transformToTwoDigits } from "@/utils/utils";
import { THEME } from "@/utils/colors";
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
		<div
			style={{
				background: THEME.cardBg,
				borderRadius: "16px",
				padding: "8px 4px 8px 0",
				boxShadow: "0 1px 3px rgba(93,64,55,0.06)",
			}}
		>
			<LineChart
				xAxis={[
					{
						id: "Horas",
						label: dateOfChart?.toLocaleDateString("es-ES", { day: "2-digit", month: "2-digit", year: "numeric" }),
						scaleType: "time",
						data: datesArray,
						valueFormatter: valueTimeFormatter,
						tickLabelStyle: {
							fontSize: 11,
							fontWeight: 500,
							fill: THEME.fontLight,
						},
					},
				]}
				yAxis={[
					{
						tickLabelStyle: {
							fontSize: 11,
							fontWeight: 500,
							fill: THEME.fontLight,
						},
					},
				]}
				series={[
					{
						id: "Precios",
						label: "€/kWh",
						curve: "catmullRom",
						data: pricesArray,
						showMark: false,
						color: THEME.primary,
						area: true,
						valueFormatter: (v: number | null) =>
							new Intl.NumberFormat("es-ES", {
								minimumFractionDigits: 5,
								maximumFractionDigits: 5,
							}).format(v ?? 0),
					},
				]}
				grid={{ horizontal: true }}
				height={250}
				sx={{
					"& .MuiAreaElement-root": {
						fill: "url(#premiumGradient)",
					},
					"& .MuiLineElement-root": {
						strokeWidth: 2.5,
						stroke: THEME.primary,
					},
					"& .MuiChartsGrid-line": {
						stroke: `${THEME.primary}0A`,
						strokeDasharray: "4 4",
					},
				}}
			>
				<defs>
					<linearGradient id="premiumGradient" x1="0" y1="0" x2="0" y2="1">
						<stop offset="0%" stopColor={THEME.primary} stopOpacity={0.4} />
						<stop offset="100%" stopColor={THEME.primary} stopOpacity={0.05} />
					</linearGradient>
				</defs>
			</LineChart>
		</div>
	);
}
