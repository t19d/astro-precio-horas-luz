export const COLORS = {
	green: {
		base: "#0B9A49",
		light: "#29AB62",
		dark: "#027936",
	},
	blue: {
		base: "#0F85D1",
		light: "#3697D6",
		dark: "#066DAF",
	},
	orange: {
		base: "#e67e22",
		light: "#F49C4D",
		dark: "#B95E0D",
	},
	red: {
		base: "#c0392b",
		light: "#D95E51",
		dark: "#9B2114",
	},
};

export const COLORS_BY_TAG = {
	low: COLORS.green.base,
	low_hover: COLORS.green.dark,
	medium: COLORS.blue.base,
	medium_hover: COLORS.blue.dark,
	high: COLORS.orange.base,
	high_hover: COLORS.orange.dark,
	highest: COLORS.red.base,
	highest_hover: COLORS.red.dark,
};

type TagColor = keyof typeof COLORS_BY_TAG;

export function getColorByTag(tag: TagColor): string {
	return COLORS_BY_TAG[tag] || COLORS_BY_TAG.medium;
}

export function getHoverColorByTag(tag: TagColor): string {
	return COLORS_BY_TAG[tag] || COLORS_BY_TAG.medium_hover;
}

/**
 *  Retorna un objeto con las tags del color de precio, en base al precio de luz comparado con la mediana y los valores de la mediana alta y baja.
 *  @param price Precio de luz actual.
 *  @param medianPrice Mediana de los precios de luz.
 *  @param highMedian Mediana alta de los precios de luz.
 *  @param lowMedian Mediana baja de los precios de luz.
 *  @returns Un objeto con las tags del color de precio.
 */
export function getTagPriceColor(price: number, medianPrice: number, highMedian: number, lowMedian: number): { color: TagColor; colorHover: TagColor } {
	if (price > medianPrice) {
		if (price > highMedian) {
			return { color: "highest", colorHover: "highest_hover" };
		} else {
			return { color: "high", colorHover: "high_hover" };
		}
	} else {
		if (price < lowMedian) {
			return { color: "low", colorHover: "low_hover" };
		} else {
			return { color: "medium", colorHover: "medium_hover" };
		}
	}
}
