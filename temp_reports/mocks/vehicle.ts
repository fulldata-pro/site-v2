// @ts-nocheck

import { VehicleData } from "../data/services/vehicles/V1/types";

// TODO: check this
export const VEHICLE_1: VehicleData = {
	summary: {
		brand: "HONDA",
		manufactured: 1216350000000,
		licensePlate: "HKD324",
		model: "FIT LX L",
		origin: "Importado",
		buyed: 1543201200000,
		type: "SEDAN 5 PUERTAS",
		year: 2008,
	},
	owners: [
		{
			address: "PADRE ZANOCHI 3315",
			birthDate: 613278000000,
			city: "VICTORIA",
			cp: "1644",
			nationalId: 34551732,
			emails: ["empresas@ehealthreporter.com"],
			firstName: "JUAN LUCIANO",
			nationality: "ARGENTINA",
			type: "Persona",
			phones: [
				{
					location: "AMBA",
					operator: "COMPAÑIA DE RADIOCOMUNICACIONES MOVILES S.A.",
					phoneNumber: "01155760116",
					wsp: null,
				},
				{
					location: "AMBA",
					operator: "TELEFONICA MOVILES ARGENTINA S.A.",
					phoneNumber: "01140512868",
					wsp: true,
				},
				{
					location: "AMBA",
					operator: "TELECOM ARGENTINA S.A.",
					phoneNumber: "01147459966",
					wsp: null,
				},
			],
			province: "BUENOS AIRES",
			sex: "M",
			taxId: 20345517325,
			percentage: 50,
		},
		{
			address: "RAMON CASTILLA 27",
			birthDate: 912049200000,
			city: "GENERAL PACHECO",
			cp: "1617",
			nationalId: 41459531,
			emails: [],
			firstName: "MALENA LUZ",
			nationality: "ARGENTINA",
			type: "Persona",
			phones: [],
			province: "BUENOS AIRES",
			sex: "F",
			taxId: 27414595311,
			percentage: 50,
		},
	],
};
