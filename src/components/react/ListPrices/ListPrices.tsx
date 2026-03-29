import type { Value } from "@/models/api.model";
import { getColorByTag, getTagPriceColor, THEME } from "@/utils/colors";
import ItemPrice from "./ItemPrice/ItemPrice";
import { getMedianaPreciosLuz } from "@/utils/utils";
import { useState, useEffect } from "react";

interface ListPricesProps {
	prices: Value[];
}

function SectionTitle({ title }: { title: string }) {
	return (
		<div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
			<div
				style={{
					width: "3px",
					height: "22px",
					background: `linear-gradient(180deg, ${THEME.accentGold}, ${THEME.accentAmber})`,
					borderRadius: "2px",
					flexShrink: 0,
				}}
			/>
			<span
				style={{
					fontSize: "17px",
					fontWeight: 700,
					color: THEME.fontMain,
					letterSpacing: "-0.2px",
				}}
			>
				{title}
			</span>
		</div>
	);
}

export default function ListPrices({ prices }: ListPricesProps) {
	const [isWide, setIsWide] = useState(false);

	useEffect(() => {
		const check = () => setIsWide(window.innerWidth >= 640);
		check();
		window.addEventListener("resize", check);
		return () => window.removeEventListener("resize", check);
	}, []);

	const medianPrices = getMedianaPreciosLuz(prices);
	const medianHighPrices = getMedianaPreciosLuz(prices.filter((v: Value) => (v.value ?? 0) >= medianPrices));
	const medianLowPrices = getMedianaPreciosLuz(prices.filter((v: Value) => (v.value ?? 0) <= medianPrices));

	const pricesSortedByValue = [...prices].sort((a, b) => (a.value ?? 0) - (b.value ?? 0));
	const top5Lowest = pricesSortedByValue.slice(0, 5);
	const top5Highest = [...pricesSortedByValue].reverse().slice(0, 5);
	const top3LowestValues = pricesSortedByValue.slice(0, 3).map((p) => p.value);
	const top3HighestValues = [...pricesSortedByValue].reverse().slice(0, 3).map((p) => p.value);

	const getColorByPrice = (value: number | undefined) => {
		if (value === undefined || value === null) return "transparent";
		const { color } = getTagPriceColor(value, medianPrices, medianHighPrices, medianLowPrices);
		return getColorByTag(color);
	};

	const getHoverColorByPrice = (value: number | undefined) => {
		if (value === undefined || value === null) return "transparent";
		const { colorHover } = getTagPriceColor(value, medianPrices, medianHighPrices, medianLowPrices);
		return getColorByTag(colorHover);
	};

	const getBadge = (value: number | undefined): "barata" | "cara" | undefined => {
		if (top3LowestValues.includes(value)) return "barata";
		if (top3HighestValues.includes(value)) return "cara";
		return undefined;
	};

	const getIcon = (value: number | undefined) => {
		if (top3LowestValues.includes(value)) return <span>⭐</span>;
		if (top3HighestValues.includes(value)) return <span>⚠️</span>;
		return undefined;
	};

	const renderItem = (price: Value, index: number) => (
		<ItemPrice
			key={index}
			color={getColorByPrice(price.value)}
			colorHover={getHoverColorByPrice(price.value)}
			price={price}
			badge={getBadge(price.value)}
			icon={getIcon(price.value)}
		/>
	);

	const gridStyle: React.CSSProperties = isWide
		? { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5px" }
		: { display: "flex", flexDirection: "column", gap: "5px" };

	const listStyle: React.CSSProperties = { display: "flex", flexDirection: "column", gap: "5px" };

	return (
		<div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
			{/* Todas las horas — grid en desktop */}
			<section>
				<SectionTitle title="Todas las horas" />
				<div style={gridStyle}>
					{prices.map((price, i) => renderItem(price, i))}
				</div>
			</section>

			{/* Mejores horas */}
			<section>
				<SectionTitle title="Mejores horas" />
				<div style={listStyle}>
					{top5Lowest.map((price, i) => renderItem(price, i))}
				</div>
			</section>

			{/* Peores horas */}
			<section>
				<SectionTitle title="Peores horas" />
				<div style={listStyle}>
					{top5Highest.map((price, i) => renderItem(price, i))}
				</div>
			</section>
		</div>
	);
}
