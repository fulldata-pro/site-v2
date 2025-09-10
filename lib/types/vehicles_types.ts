export enum VehicleDataTypes {
	summary = "summary",
	owners = "owners",
}
export interface VehicleData {
	[VehicleDataTypes.summary]: SummaryData;
	[VehicleDataTypes.owners]: OwnerData[];
}

export interface SummaryData {
	buyed: number;
	type: string;
	licensePlate: string;
	manufactured: number;
	year: number;
	model: string;
	brand: string;
	origin: string;
}

export interface OwnerData {
	nationalId: number;
	taxId: number;
	type: string;
	firstName: string;
	lastName: string;
	birthDate: number;
	sex: string;
	nationality: string;
	province: string;
	city: string;
	cp: string;
	address: string;
	phones: PhoneData[];
	emails: string[];
	percentage: number;
}

export interface PhoneData {
	phoneNumber: string;
	operator: string;
	location: string;
	wsp: boolean;
}
