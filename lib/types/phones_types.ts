export enum PhoneDataTypes {
	owners = "owners",
}

export interface PhoneData {
	[PhoneDataTypes.owners]: OwnerData[];
}

export interface OwnerData {
	taxId: number;
	name: string;
	personType: string;
}
