import type { Value } from "@/models/api.model";
import Grid from "@mui/material/Grid";
import { getColorByTag, getHoverColorByTag } from "@/utils/colors";
import ItemPrice from "./ItemPrice/ItemPrice";
import StarsRoundedIcon from "@mui/icons-material/StarsRounded";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";

interface ListPricesProps {
	prices: Value[];
}

export default function ListPrices({ prices }: ListPricesProps) {
	const pricesSortedByValue = [...prices].sort((a, b) => (a.value ?? 0) - (b.value ?? 0)).map((price) => price.value);

	const lowestPrices = pricesSortedByValue.slice(0, 5);
	const top3LowestPrices = lowestPrices.slice(0, 3);
	const highestPrices = pricesSortedByValue.slice(-5).reverse();
	const top3HighestPrices = highestPrices.slice(0, 3);

	const getColorByPrice = (value: number | undefined) => {
		const lowPriceColorTag = "low";
		const mediumPriceColorTag = "medium";
		const highPriceColorTag = "high";
		const highestPricesColorTag = "highest";

		if (lowestPrices.includes(value ?? 0)) return getColorByTag(lowPriceColorTag);
		if (highestPrices[0] === value) return getColorByTag(highestPricesColorTag);
		if (highestPrices.includes(value ?? 0)) return getColorByTag(highPriceColorTag);

		return getColorByTag(mediumPriceColorTag);
	};

	const getHoverColorByPrice = (value: number | undefined) => {
		const lowPriceColorTag = "low_hover";
		const mediumPriceColorTag = "medium_hover";
		const highPriceColorTag = "high_hover";
		const highestPricesColorTag = "highest_hover";

		if (lowestPrices.includes(value ?? 0)) return getHoverColorByTag(lowPriceColorTag);
		if (highestPrices[0] === value) return getHoverColorByTag(highestPricesColorTag);
		if (highestPrices.includes(value ?? 0)) return getHoverColorByTag(highPriceColorTag);

		return getHoverColorByTag(mediumPriceColorTag);
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
