import type { Value } from "@/models/api.model";
import { transformToFiveDecimals } from "@/utils/utils";
import { parseHourRange } from "@/utils/utils";

interface ItemPriceProps {
	color: string;
	colorHover: string;
	price: Value;
	icon?: React.ReactNode;
	badge?: "barata" | "cara";
}

export default function ItemPrice({ color, price, icon, badge }: ItemPriceProps) {
	return (
		<div
			style={{
				background: `linear-gradient(135deg, ${color}, ${color}cc)`,
				borderRadius: "12px",
				padding: "10px 14px",
				color: "#fff",
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				gap: "8px",
				transition: "transform 0.15s ease, box-shadow 0.15s ease",
				cursor: "default",
			}}
			onMouseEnter={(e) => {
				e.currentTarget.style.transform = "translateY(-1px)";
				e.currentTarget.style.boxShadow = `0 4px 14px ${color}40`;
			}}
			onMouseLeave={(e) => {
				e.currentTarget.style.transform = "translateY(0)";
				e.currentTarget.style.boxShadow = "none";
			}}
		>
			<div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
				<span style={{ fontSize: "14px", fontWeight: 600 }}>
					{parseHourRange(price.datetime)}
				</span>
				{badge && (
					<span
						style={{
							background: "rgba(255,255,255,0.18)",
							padding: "2px 8px",
							borderRadius: "6px",
							fontSize: "10px",
							fontWeight: 600,
							display: "inline-flex",
							alignItems: "center",
							gap: "3px",
						}}
					>
						{icon}
						{badge === "barata" ? "Barata" : "Cara"}
					</span>
				)}
			</div>
			<span style={{ fontSize: "14px", fontWeight: 700, letterSpacing: "-0.2px" }}>
				{transformToFiveDecimals(price.value)} €/kWh
			</span>
		</div>
	);
}
