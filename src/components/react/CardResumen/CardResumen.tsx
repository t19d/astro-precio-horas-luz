import type { Value } from "@/models/api.model";
import { THEME } from "@/utils/colors";
import { getColorByTag, getTagPriceColor } from "@/utils/colors";
import {
	getActualHourPrice,
	getNextBestHourPrice,
	getMediaPreciosLuz,
	getMedianaPreciosLuz,
	parseHourRange,
	transformToFiveDecimals,
} from "@/utils/utils";

interface CardResumenProps {
	prices: Value[];
}

export default function CardResumen({ prices }: CardResumenProps) {
	const medianPrices = getMedianaPreciosLuz(prices);
	const medianHighPrices = getMedianaPreciosLuz(prices.filter((v) => (v.value ?? 0) >= medianPrices));
	const medianLowPrices = getMedianaPreciosLuz(prices.filter((v) => (v.value ?? 0) <= medianPrices));

	const actualPrice = getActualHourPrice(prices);
	const nextBestPrice = getNextBestHourPrice(prices);
	const averagePrice = getMediaPreciosLuz(prices);

	const getColor = (value: number | undefined) => {
		if (value === undefined) return THEME.quaternary;
		const { color } = getTagPriceColor(value, medianPrices, medianHighPrices, medianLowPrices);
		return getColorByTag(color);
	};

	return (
		<div style={styles.card}>
			<div style={styles.topRow}>
				<CardColumn
					label="ACTUAL"
					hour={actualPrice ? parseHourRange(actualPrice.datetime) : "--h"}
					price={transformToFiveDecimals(actualPrice?.value)}
					color={getColor(actualPrice?.value)}
				/>
				<div style={styles.divider} />
				<CardColumn
					label="SIGUIENTE"
					hour={nextBestPrice ? parseHourRange(nextBestPrice.datetime) : "--h"}
					price={transformToFiveDecimals(nextBestPrice?.value)}
					color={getColor(nextBestPrice?.value)}
				/>
				<div style={styles.divider} />
				<CardColumn
					label="MEDIA"
					hour=""
					price={transformToFiveDecimals(averagePrice)}
					color={THEME.quaternary}
				/>
			</div>
		</div>
	);
}

interface CardColumnProps {
	label: string;
	hour: string;
	price: string;
	color: string;
}

function CardColumn({ label, hour, price, color }: CardColumnProps) {
	return (
		<div style={styles.column}>
			<span style={styles.label}>{label}</span>
			{hour && <span style={styles.hour}>{hour}</span>}
			<span style={{ ...styles.price, color }}>{price}</span>
			<span style={styles.unit}>€/kWh</span>
		</div>
	);
}

const styles: Record<string, React.CSSProperties> = {
	card: {
		background: THEME.cardBg,
		borderRadius: "18px",
		padding: "20px 16px",
		boxShadow: "0 1px 3px rgba(93,64,55,0.06)",
	},
	topRow: {
		display: "flex",
		alignItems: "flex-start",
		justifyContent: "space-evenly",
	},
	divider: {
		width: "1px",
		alignSelf: "stretch",
		backgroundColor: `${THEME.primary}0C`,
		borderRadius: "1px",
		margin: "4px 0",
	},
	column: {
		flex: 1,
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		gap: "2px",
		textAlign: "center",
	},
	label: {
		fontSize: "10px",
		fontWeight: 600,
		color: THEME.fontLight,
		letterSpacing: "1px",
		textTransform: "uppercase" as const,
	},
	hour: {
		fontSize: "12px",
		fontWeight: 400,
		color: THEME.fontLight,
		marginTop: "1px",
	},
	price: {
		fontSize: "20px",
		fontWeight: 700,
		letterSpacing: "-0.5px",
		marginTop: "2px",
	},
	unit: {
		fontSize: "10px",
		color: THEME.fontLight,
	},
};
