import { THEME } from "@/utils/colors";

export default function Footer() {
	return (
		<footer style={styles.footer}>
			<p style={styles.text}>
				Todos los datos mostrados en esta aplicación son extraídos de la API oficial de la Red
				Eléctrica de España (REE). Esta aplicación no se hace responsable de la exactitud o
				integridad de la información proporcionada por la API de REE. Los precios mostrados son
				meramente informativos y no constituyen asesoramiento financiero o legal.
			</p>
		</footer>
	);
}

const styles: Record<string, React.CSSProperties> = {
	footer: {
		padding: "24px",
		borderTop: `1px solid ${THEME.primary}08`,
		marginTop: "16px",
	},
	text: {
		fontSize: "11px",
		color: THEME.fontLight,
		lineHeight: 1.6,
		maxWidth: "640px",
		margin: "0 auto",
		textAlign: "center",
	},
};
