import type { Value } from "@/models/api.model";
import Grid from "@mui/material/Grid";
import { getColorByTag, getHoverColorByTag, getTagPriceColor } from "@/utils/colors";
import ItemPrice from "./ItemPrice/ItemPrice";
import StarsRoundedIcon from "@mui/icons-material/StarsRounded";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";
import { getMedianaPreciosLuz } from "@/utils/utils";

interface ListPricesProps {
	prices: Value[];
}

export default function ListPrices({ prices }: ListPricesProps) {
	const medianPrices = getMedianaPreciosLuz(prices);
	const medianHighPrices = getMedianaPreciosLuz(prices.filter((v: Value) => v.value! >= medianPrices));
	const medianLowPrices = getMedianaPreciosLuz(prices.filter((v: Value) => v.value! <= medianPrices));

	const pricesSortedByValue = [...prices].sort((a, b) => (a.value ?? 0) - (b.value ?? 0)).map((price) => price.value);
	const top3LowestPrices = pricesSortedByValue.slice(0, 3);
	const top3HighestPrices = pricesSortedByValue.slice(-3).reverse();

	const getColorByPrice = (value: number | undefined) => {
		if (!value) return "transparent";

		const { color } = getTagPriceColor(value, medianPrices, medianHighPrices, medianLowPrices);
		return getColorByTag(color);
	};

	const getHoverColorByPrice = (value: number | undefined) => {
		if (!value) return "transparent";

		const { colorHover } = getTagPriceColor(value, medianPrices, medianHighPrices, medianLowPrices);
		return getColorByTag(colorHover);
	};

	const getIconByPrice = (value: number | undefined) => {
		if (top3LowestPrices.includes(value ?? 0)) return <StarsRoundedIcon />;
		if (top3HighestPrices.includes(value ?? 0)) return <ErrorRoundedIcon />;

		return null;
	};

	// Grid MUI
	return (
		<Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
			{prices.map((price: Value, index: number) => (
				<Grid item xs={4} sm={4} md={4} key={index}>
					<ItemPrice
						color={getColorByPrice(price.value)}
						colorHover={getHoverColorByPrice(price.value)}
						price={price}
						icon={getIconByPrice(price.value)}
					/>
				</Grid>
			))}
		</Grid>
	);
}
