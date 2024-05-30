import type { Value } from "@/models/api.model";

interface ListPricesProps {
	prices: Value[];
}

export default function ListPrices({ prices }: ListPricesProps) {
	return (
		<ul>
			{prices.map((price: Value, index: number) => (
				<li key={index}>
					<span>{price.value}</span>
				</li>
			))}
		</ul>
	);
}
