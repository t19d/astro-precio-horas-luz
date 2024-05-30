import type { Value } from "@/models/api.model";
import { experimentalStyled as styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

interface ListPricesProps {
	prices: Value[];
}

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
	...theme.typography.body2,
	padding: theme.spacing(2),
	textAlign: "center",
	color: theme.palette.text.secondary,
}));

export default function ListPrices({ prices }: ListPricesProps) {
	// Grid MUI

	return (
		<div>
			<h1>List Prices</h1>
			<div>{prices.length}</div>
			<Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
				{prices.map((price: Value, index: number) => (
					<Grid item xs={4} sm={4} md={4} key={index}>
						<Item>{price.value}</Item>
					</Grid>
				))}
			</Grid>
		</div>
	);
}
