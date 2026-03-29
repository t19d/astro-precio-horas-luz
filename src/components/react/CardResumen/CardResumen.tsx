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
			{/* Top row: Actual + Siguiente */}
			<div style={styles.topRow}>
				<CardColumn
					icon="🕐"
					label="ACTUAL"
					hour={actualPrice ? parseHourRange(actualPrice.datetime) : "--h"}
					price={transformToFiveDecimals(actualPrice?.value)}
					color={getColor(actualPrice?.value)}
				/>
				<div style={styles.dividerVertical} />
				<CardColumn
					icon="▼"
					label="SIGUIENTE"
					hour={nextBestPrice ? parseHourRange(nextBestPrice.datetime) : "--h"}
					price={transformToFiveDecimals(nextBestPrice?.value)}
					color={getColor(nextBestPrice?.value)}
				/>
			</div>
			<div style={{ height: "10px" }} />
			{/* Bottom row: Media */}
			<CardColumn
				icon="📊"
				label="MEDIA"
				hour=""
				price={transformToFiveDecimals(averagePrice)}
				color={THEME.quaternary}
			/>
		</div>
	);
}

interface CardColumnProps {
	icon: string;
	label: string;
	hour: string;
	price: string;
	color: string;
}

function CardColumn({ icon, label, hour, price, color }: CardColumnProps) {
	return (
		<div style={styles.column}>
			<div style={styles.labelRow}>
				<span style={{ fontSize: "14px" }}>{icon}</span>
				<span style={styles.label}>{label}</span>
			</div>
			{hour && <span style={styles.hour}>{hour}</span>}
			<span style={{ ...styles.price, color }}>{price}</span>
			<span style={styles.unit}>€/kWh</span>
		</div>
	);
}

const styles: Record<string, React.CSSProperties> = {
	card: {
		background: THEME.cardBg,
		borderRadius: "24px",
		padding: "24px 24px",
		boxShadow: `0 6px 24px ${THEME.primary}14`,
	},
	topRow: {
		display: "flex",
		alignItems: "flex-start",
		justifyContent: "space-evenly",
		gap: "8px",
	},
	dividerVertical: {
		width: "1px",
		minHeight: "60px",
		marginTop: "8px",
		backgroundColor: `${THEME.primary}14`,
		borderRadius: "1px",
	},
	column: {
		flex: 1,
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		gap: "4px",
		textAlign: "center",
	},
	labelRow: {
		display: "flex",
		alignItems: "center",
		gap: "4px",
	},
	label: {
		fontSize: "11px",
		fontWeight: 700,
		color: THEME.fontLight,
		letterSpacing: "1.2px",
		textTransform: "uppercase" as const,
	},
	hour: {
		fontSize: "13px",
		fontWeight: 500,
		color: THEME.fontMain,
	},
	price: {
		fontSize: "18px",
		fontWeight: 800,
		letterSpacing: "-0.3px",
		fontFamily: "var(--font-body)",
	},
	unit: {
		fontSize: "11px",
		color: THEME.fontLight,
	},
};
