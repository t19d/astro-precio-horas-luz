export interface ElectricityPrices {
	data?: Data;
	included?: Included[];
}

export interface Data {
	type?: string;
	id?: string;
	attributes?: Attributes;
	meta?: Meta;
}

export interface Attributes {
	title?: string;
	description?: any;
	color?: string;
	type?: any;
	magnitude?: string;
	composite?: boolean;
	lastUpdate?: string;
	values?: Value[];
}

export interface Value {
	value?: number;
	percentage?: number;
	datetime?: string;
}

export interface Meta {
	cacheControl?: CacheControl;
}

export interface CacheControl {
	cache?: string;
	expireAt?: string;
}

export interface Included {
	type?: string;
	id?: string;
	groupId?: any;
	attributes?: Attributes;
}
