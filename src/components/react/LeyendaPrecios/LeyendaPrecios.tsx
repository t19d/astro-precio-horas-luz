import { PRICE_LEGEND, THEME } from "@/utils/colors";

export default function LeyendaPrecios() {
	return (
		<div style={styles.container}>
			{PRICE_LEGEND.map((item) => (
				<div key={item.label} style={styles.item}>
					<span
						style={{
							...styles.dot,
							backgroundColor: item.color,
						}}
					/>
					<span style={styles.label}>{item.label}</span>
				</div>
			))}
		</div>
	);
}

const styles: Record<string, React.CSSProperties> = {
	container: {
		display: "flex",
		flexWrap: "wrap",
		gap: "14px",
		justifyContent: "center",
		padding: "12px 0",
	},
	item: {
		display: "flex",
		alignItems: "center",
		gap: "6px",
	},
	dot: {
		width: "10px",
		height: "10px",
		borderRadius: "50%",
		flexShrink: 0,
	},
	label: {
		fontSize: "12px",
		fontWeight: 500,
		color: THEME.fontLight,
	},
};
