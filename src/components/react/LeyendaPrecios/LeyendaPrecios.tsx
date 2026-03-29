import { PRICE_LEGEND, THEME } from "@/utils/colors";

export default function LeyendaPrecios() {
	return (
		<div style={styles.container}>
			<h3 style={styles.title}>Leyenda de precios</h3>
			<div style={styles.grid}>
				{PRICE_LEGEND.map((item) => (
					<div key={item.label} style={styles.item}>
						<span
							style={{
								...styles.dot,
								backgroundColor: item.color,
								boxShadow: `0 2px 8px ${item.color}40`,
							}}
						/>
						<span style={styles.label}>{item.label}</span>
					</div>
				))}
			</div>
		</div>
	);
}

const styles: Record<string, React.CSSProperties> = {
	container: {
		background: `${THEME.primary}0A`,
		borderRadius: "20px",
		padding: "20px 24px",
		border: `1px solid ${THEME.primary}14`,
	},
	title: {
		fontSize: "14px",
		fontWeight: 400,
		color: `${THEME.fontMain}BF`,
		marginBottom: "14px",
		fontFamily: "var(--font-body)",
		textAlign: "center" as const,
	},
	grid: {
		display: "grid",
		gridTemplateColumns: "1fr 1fr",
		gap: "10px 24px",
	},
	item: {
		display: "flex",
		alignItems: "center",
		gap: "10px",
	},
	dot: {
		width: "16px",
		height: "16px",
		borderRadius: "6px",
		flexShrink: 0,
	},
	label: {
		fontSize: "13px",
		fontWeight: 500,
		color: THEME.fontMain,
	},
};
