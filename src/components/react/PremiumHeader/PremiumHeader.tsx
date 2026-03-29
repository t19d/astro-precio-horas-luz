import { THEME, TARIFFS } from "@/utils/colors";

interface PremiumHeaderProps {
	dateStr: string;
	tariff: string;
}

export default function PremiumHeader({ dateStr, tariff }: PremiumHeaderProps) {
	const navigate = (key: string, value: string) => {
		const params = new URLSearchParams(window.location.search);
		params.set(key, value);
		window.location.search = params.toString();
	};

	return (
		<header style={styles.header}>
			<div style={styles.inner}>
				<div style={styles.left}>
					<div style={styles.logoRow}>
						<span style={styles.bolt}>⚡</span>
						<div>
							<span style={styles.title}>Precio Horas Luz</span>
							<p style={styles.subtitle}>Resumen del día</p>
						</div>
					</div>
				</div>
				<div style={styles.controlsRow}>
					<input
						type="date"
						value={dateStr}
						onChange={(e) => navigate("date", e.target.value)}
						style={styles.control}
					/>
					<select
						value={tariff}
						onChange={(e) => navigate("tariff", e.target.value)}
						style={styles.control}
					>
						{TARIFFS.map((t) => (
							<option key={t.code} value={t.code} style={{ color: "#333" }}>
								{t.name}
							</option>
						))}
					</select>
				</div>
			</div>
		</header>
	);
}

const styles: Record<string, React.CSSProperties> = {
	header: {
		background: THEME.primaryDark,
		borderBottom: `1px solid rgba(255,255,255,0.06)`,
		padding: "0",
	},
	inner: {
		maxWidth: "1280px",
		margin: "0 auto",
		padding: "16px 24px",
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		gap: "16px",
		flexWrap: "wrap" as const,
	},
	left: {
		display: "flex",
		alignItems: "center",
	},
	logoRow: {
		display: "flex",
		alignItems: "center",
		gap: "10px",
	},
	bolt: {
		fontSize: "18px",
		opacity: 0.9,
	},
	title: {
		color: "#fff",
		fontSize: "17px",
		fontWeight: 600,
		letterSpacing: "-0.2px",
		display: "block",
		lineHeight: 1.2,
	},
	subtitle: {
		color: "rgba(255,255,255,0.4)",
		fontSize: "11px",
		fontWeight: 400,
		marginTop: "1px",
	},
	controlsRow: {
		display: "flex",
		gap: "6px",
		flexWrap: "wrap" as const,
	},
	control: {
		background: "rgba(255,255,255,0.07)",
		border: "1px solid rgba(255,255,255,0.1)",
		borderRadius: "8px",
		color: "#fff",
		padding: "6px 10px",
		fontSize: "12px",
		fontWeight: 500,
		fontFamily: "inherit",
		cursor: "pointer",
		outline: "none",
		WebkitAppearance: "none" as any,
		colorScheme: "dark",
	},
};
