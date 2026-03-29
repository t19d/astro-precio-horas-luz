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

export default function ItemPrice({ color, colorHover, price, icon, badge }: ItemPriceProps) {
	return (
		<div
			style={{
				background: `linear-gradient(135deg, ${color}, ${color}dd)`,
				borderRadius: "16px",
				padding: "14px 20px",
				color: "#fff",
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				gap: "8px",
				boxShadow: `0 4px 12px ${color}25`,
				transition: "all 0.2s ease",
				cursor: "default",
			}}
			onMouseEnter={(e) => {
				e.currentTarget.style.background = `linear-gradient(135deg, ${colorHover}, ${colorHover}dd)`;
				e.currentTarget.style.boxShadow = `0 6px 20px ${colorHover}40`;
				e.currentTarget.style.transform = "translateY(-1px)";
			}}
			onMouseLeave={(e) => {
				e.currentTarget.style.background = `linear-gradient(135deg, ${color}, ${color}dd)`;
				e.currentTarget.style.boxShadow = `0 4px 12px ${color}25`;
				e.currentTarget.style.transform = "translateY(0)";
			}}
		>
			<div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
				<span
					style={{
						display: "inline-flex",
						alignItems: "center",
						justifyContent: "center",
						width: "28px",
						height: "28px",
						background: "rgba(255,255,255,0.15)",
						borderRadius: "8px",
						fontSize: "13px",
					}}
				>
					🕐
				</span>
				<span style={{ fontSize: "15px", fontWeight: 600, letterSpacing: "0.3px" }}>
					{parseHourRange(price.datetime)}
				</span>
				{badge && (
					<span
						style={{
							background: "rgba(255,255,255,0.2)",
							padding: "3px 10px",
							borderRadius: "20px",
							fontSize: "11px",
							fontWeight: 700,
							display: "inline-flex",
							alignItems: "center",
							gap: "4px",
							border: "1px solid rgba(255,255,255,0.15)",
						}}
					>
						{icon}
						{badge === "barata" ? "Barata" : "Cara"}
					</span>
				)}
			</div>
			<span style={{ fontSize: "15px", fontWeight: 700, letterSpacing: "-0.2px" }}>
				{transformToFiveDecimals(price.value)} €/kWh
			</span>
		</div>
	);
}
