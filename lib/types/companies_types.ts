export enum CompaniesDataTypes {
	summary = "summary",
	addressData = "addressData",
	contactData = "contactData",
	assets = "assets",
	taxes = "taxes",
	financialSituation = "financialSituation",
}

export interface CompaniesData {
	[CompaniesDataTypes.summary]: SummaryData;
	[CompaniesDataTypes.addressData]: AddressData[];
	[CompaniesDataTypes.contactData]: ContactData;
	[CompaniesDataTypes.assets]: AssetsData;
	[CompaniesDataTypes.taxes]: TaxData;
	[CompaniesDataTypes.financialSituation]: FinancialSituationData;
}

export interface AddressData {
	address: string;
	addressNumber: string;
	floor: string;
	appartment: string;
	postalCode: string;
	city: string;
	province: string;
	country: string;
}

export interface ContactData {
	email: string[];
	phones: PhoneData[];
}

export interface PhoneData {
	code: string;
	phoneNumber: string;
	operator?: string;
	wsp?: boolean;
}

export interface SummaryData {
	activity: string;
	activity2: string;
	cessation: string;
	taxId: number;
	wageBill: string;
	ciiu: string;
	employees: number;
	subCategory: string;
	rz: string;
	category: string;
	city: string;
	cp: number;
	province: string;
	constitutionDate: number;
	state: string;
	stateSupplier: string;
	isExporter: string;
	societyType: string;
	isBanked: boolean;
	age: string;
	webs: iWebs[];
	startDate: number;
	score: iScore[];
}

export interface iWebs {
	url: string;
	checked: boolean;
}

export interface AssetsData {
	cars: CarData[];
	carsEmbargoes: CarDebtData[];
	buildings: BuildingData[];
}

export interface TaxData {
	gciaExcluded: boolean;
	gcia: "Activo" | "Inactivo";
	gciaInscriptionDate: number;
	afipInscriptionDate: number;
	retirementContributions24m: iRetirementContributions24m[];
	// IS XML
	taxesDetail: iTaxesDetail[];
}

export interface FinancialSituationData {
	operativeBanks: BankData[];
	bcraInfo: BankData[];
	bouncedChecks: CheckData[];
	bankDebtors: string[];

	insurer: string;
	worstSituation: string;
	estimatedBilling: string;
	monthlyCommitment: string;
	hasApocryphalInvoices: boolean;
	hasFiscalDebt: string;
	interestOnRevolvingLoans: string;
	entitiesInArrears: string;
	// si, no
	isLatePayment: boolean;
	debtorComplianceProfile: string;
	judments3m: string;
	judments12m: string;
	judments24m: string;
	contestAndBankruptcies3m: string;
	contestAndBankruptcies12m: string;
	contestAndBankruptcies24m: string;
	// IS XML
	historicalDebt: iHistoricalDebt[];
	creditCardPaymentAmount: string;
	bcraWorstSituation12m: string;
	// IS XML
	cne: iCne[];
}

export interface BankData {
	name: string;
	situation: string;
	amount?: string;
	period?: number;
	loan?: number;
}

export interface CarData {
	licence_plate: string;
	buyed: number;
	model: string;
	brand: string;
	origin: string;
	year: number;
	type: string;
	manufactured: number;
	inPossession: boolean;
}

export interface CarDebtData {
	licensePlate: string;
	debt: string;
	valuation: string;
	brand: string;
	province: string;
}
export interface CheckData {
	number: string;
	rejectedDate: number;
	amount: string;
	payedDate: number;
	condition: string;
	liftingDate: number;
	penalty: string;
}

export interface iHistoricalDebt {
	period: number;
	amount: number;
}

export interface BuildingData {
	landSurface: number;
	buildingSurface: number;
	address: string;
}

export interface iScore {
	period: string;
	value: string;
}

export interface iCne {
	period: string;
	value: boolean;
}

export interface iHistoricalDebt {
	period: number;
	amount: number;
}

export interface iRetirementContributions24m {
	period: number;
	payed: boolean;
}

export interface iTaxesDetail {
	description: number;
	amount: number;
}
