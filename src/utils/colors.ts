// Premium warm theme matching Flutter app
export const THEME = {
	primary: "#5D4037",
	primaryDark: "#3E2723",
	secondary: "#F5F0EB",
	tertiary: "#BCAA9E",
	quaternary: "#8D7B74",
	quinary: "#4E3B31",
	accentGold: "#D4A853",
	accentAmber: "#F5C36D",
	surface: "#FAF7F4",
	fontMain: "#3D2E27",
	fontLight: "#9A8A82",
	fontWhite: "#FFFFFF",
	cardBg: "#FFFFFF",
};

export const COLORS = {
	green: {
		base: "#27AE60",
		light: "#2ECC71",
		dark: "#1E8449",
	},
	blue: {
		base: "#2E86DE",
		light: "#5DADE2",
		dark: "#2471A3",
	},
	orange: {
		base: "#E67E22",
		light: "#F5B041",
		dark: "#CA6F1E",
	},
	red: {
		base: "#E74C3C",
		light: "#EC7063",
		dark: "#CB4335",
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

export const PRICE_LEGEND = [
	{ label: "Precios bajos", color: COLORS.green.base },
	{ label: "Precios medios", color: COLORS.blue.base },
	{ label: "Precios altos", color: COLORS.orange.base },
	{ label: "Precios más altos", color: COLORS.red.base },
];
