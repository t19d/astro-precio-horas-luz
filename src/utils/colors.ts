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

export function getColorByTag(tag: "low" | "medium" | "high" | "highest"): string {
	return COLORS_BY_TAG[tag] || COLORS_BY_TAG.medium;
}

export function getHoverColorByTag(tag: "low_hover" | "medium_hover" | "high_hover" | "highest_hover"): string {
	return COLORS_BY_TAG[tag] || COLORS_BY_TAG.medium_hover;
}
