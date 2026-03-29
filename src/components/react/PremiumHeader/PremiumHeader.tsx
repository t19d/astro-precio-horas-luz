import { THEME } from "@/utils/colors";
import { formatDateDDMMYYYY } from "@/utils/utils";

interface PremiumHeaderProps {
	date: Date;
	title?: string;
	subtitle?: string;
}

export default function PremiumHeader({ date, title = "Precio Horas Luz", subtitle = "Resumen del día" }: PremiumHeaderProps) {
	return (
		<div style={styles.header}>
			<div style={styles.topRow}>
				<div style={styles.iconContainer}>
					<span style={{ fontSize: "18px" }}>⚡</span>
				</div>
				<span style={styles.title}>{title}</span>
				<div style={{ flex: 1 }} />
				<span style={styles.dateBadge}>{formatDateDDMMYYYY(date)}</span>
			</div>
			<p style={styles.subtitle}>{subtitle}</p>
		</div>
	);
}

const styles: Record<string, React.CSSProperties> = {
	header: {
		background: `linear-gradient(135deg, ${THEME.primary}, ${THEME.primaryDark})`,
		borderRadius: "0 0 32px 32px",
		padding: "28px 24px 28px 24px",
		boxShadow: `0 8px 20px ${THEME.primary}4D`,
	},
	topRow: {
		display: "flex",
		alignItems: "center",
		gap: "12px",
	},
	iconContainer: {
		display: "inline-flex",
		alignItems: "center",
		justifyContent: "center",
		width: "36px",
		height: "36px",
		background: `${THEME.accentGold}33`,
		borderRadius: "12px",
	},
	title: {
		color: "#fff",
		fontSize: "22px",
		fontWeight: 800,
		letterSpacing: "-0.5px",
		fontFamily: "var(--font-body)",
	},
	dateBadge: {
		color: "#fff",
		fontSize: "13px",
		fontWeight: 600,
		background: "rgba(255,255,255,0.12)",
		padding: "6px 12px",
		borderRadius: "24px",
		border: "1px solid rgba(255,255,255,0.15)",
	},
	subtitle: {
		color: "rgba(255,255,255,0.6)",
		fontSize: "14px",
		fontWeight: 500,
		letterSpacing: "0.2px",
		marginTop: "8px",
		paddingLeft: "2px",
	},
};
