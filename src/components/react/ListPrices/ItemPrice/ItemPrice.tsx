import { experimentalStyled as styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import style from "./ItemPrice.module.css";
import type { Value } from "@/models/api.model";
import { transformToFiveDecimals, transformToTwoDigits } from "@/utils/utils";

interface ItemPriceProps {
	color: string;
	colorHover: string;
	price: Value;
	icon?: any;
}

export default function ItemPrice({ color, colorHover, price, icon }: ItemPriceProps) {
	const parseTime = (datetime: string | undefined) => {
		let date = new Date(datetime ?? "");
		let hours = transformToTwoDigits(date.getHours());
		let minutes = transformToTwoDigits(date.getMinutes());
		const initialHour = `${hours}:${minutes}`;

		// 59 minutos depués
		date.setMinutes(date.getMinutes() + 59);
		hours = transformToTwoDigits(date.getHours());
		minutes = transformToTwoDigits(date.getMinutes());
		const finalHour = `${hours}:${minutes}`;

		return `${initialHour} - ${finalHour}`;
	};

	return (
		<Item color={color} colorHover={colorHover}>
			<span className={style.hour}>{parseTime(price.datetime)}</span>
			<div className={style.price}>
				{icon && icon}
				<span>{transformToFiveDecimals(price.value)} €/kWh</span>
			</div>
		</Item>
	);
}

interface ItemProps {
	color?: string;
	colorHover?: string;
}

const Item = styled(Paper, {
	shouldForwardProp: (prop) => prop !== "color" && prop !== "colorHover",
})<ItemProps>(({ theme, color, colorHover }) => ({
	...theme.typography.body2,
	padding: theme.spacing(2),
	textAlign: "center",
	color: "white",
	backgroundColor: color,
	boxShadow: theme.shadows[3],
	borderRadius: theme.shape.borderRadius,
	transition: theme.transitions.create(["background-color", "box-shadow"], {
		duration: theme.transitions.duration.short,
	}),
	display: "flex",
	justifyContent: "space-between",
	alignItems: "center",
	"&:hover": {
		backgroundColor: colorHover,
		boxShadow: theme.shadows[5],
	},
}));
