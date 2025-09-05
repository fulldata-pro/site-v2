export enum PeopleDataTypes {
	summary = "summary",
	addressData = "addressData",
	contactData = "contactData",
	laborData = "laborData",
	bonds = "bonds",
	personalProperty = "personalProperty",
	taxes = "taxes",
	financialSituation = "financialSituation",
	officialBulletin = "officialBulletin",
	isBanked = "isBanked",
	nicDomains = "nicDomains",
}

export interface PeopleData {
	summary: SummaryData;
	addressData: AddressData[];
	contactData: ContactData;
	laborData: LaborData;
	bonds: BondsData;
	personalProperty: PersonalPropertyData;
	taxes: TaxData;
	financialSituation: FinancialSituationData;
	officialBulletin: OfficialBolletinData;
	isBanked: boolean;
	nicDomains: NicDomains[];
}

export interface NicDomains {
	url: string;
	status: "VERIFIED" | "NOT_VERIFIED";
}

export interface SummaryData {
	firstName: string;
	lastName: string;
	taxId: number | string;
	nationalId: number | string;
	nationalIdVersion: string;
	nationality: string;
	birthDate: number | { $numberLong: string };
	deathDate: number;
	age: number;
	sex: string;
	maritalStatus: MaritalStatus | string;
	score: Score[];
	socioeconomicLevel: SocioeconomicLevel | string;
}

export enum MaritalStatus {
	SINGLE = "SINGLE",
	MARRIED = "MARRIED",
	DIVORCED = "DIVORCED",
	WIDOWER = "WIDOWER",
}

export interface Score {
	period: string;
	value: string;
}

export enum SocioeconomicLevel {
	"A" = "A",
	"B" = "B",
	"C1" = "C1",
	"C2" = "C2",
	"C3" = "C3",
	"D1" = "D1",
	"D2" = "D2",
	"E" = "E",
}

export interface AddressData {
	address: string;
	addressNumber: string;
	floor: string | null;
	appartment: string | null;
	addressPhone: string | null;
	postalCode: string;
	city: string;
	province: string;
	country: string | null;
}

export interface ContactData {
	emails: string[];
	phones: PhoneData[];
}

export interface PhoneData {
	code: string;
	phoneNumber: string;
	operator?: string;
	wsp?: boolean;
}

export interface LaborData {
	activities: ActivityData[];
	afipInscriptionWeeks: string;
	autonomus: string | null;
	laborSituation: string[];
	// autonomusAct: string | null;
	// autonomusDate: number | null;
	aportHistory: string | null;
	employer: boolean;
	employerHistory: EmployerData[];
	inSociety: boolean;
	retired: boolean;
	// monotribute: iMonotribute;
	// gciaInscription: boolean;
	// gciaInscriptionCondition: string;
	// ivaInscription: boolean;
	// ivaInscriptionCondition: string;
	// autonomousDate: number;
	// autonomousAct: string;
	// // monotribute: IMonotribute;
	// monotributeAct: string;
	// monotributeDate: number;
	osCondition: string | null;
	osDate: number | null;
	osCode: string | null;
	osName: string | null;
	osRelationship: string | null;
	socialSecurity: string[] | null;
	// gciaInscription: boolean;
	// gciaInscriptionCondition: string;
	// ivaInscription: string;
	// ivaInscriptionCondition: string;
	salary?: SalaryData[];
}

export interface ActivityData {
	type?: string;
	description: string;
	startDate?: number | { $numberLong: string } | null;
	sector?: string;
	category?: string;
	ciiu?: number;
}

export interface ContributionData {
	taxId: number | { $numberLong: string };
	period: number | { $numberLong: string } | null;
	payed: boolean;
}

export interface ContributionsEmployerData {
	period: string;
	employees: { name: string; taxId: number }[];
	employeesNumber: number;
}

export interface EmployerData {
	name: string;
	active?: boolean;
	salary?: string;
	startDate: number | { $numberLong: string };
	finishDate: number | { $numberLong: string };
	employerActivity?: string;
	employerData?: {
		address: string;
		city: string;
		employees: number;
		phone: string | null;
		postalCode: number;
		province: string;
		taxId?: number | { $numberLong: string };
	};
}

export interface iMonotribute {
	type: string;
	category: string;
	gcia: string;
	iva: string;
	inSociety: boolean;
	startDate: number | { $numberLong: string } | null;
	finishDate: number | { $numberLong: string } | null;
	code: string | null;
}

export interface SalaryData {
	period: string;
	amount: number;
}

export interface BondsData {
	main: BondData[];
	others?: BondData[];
}

export interface BondData {
	taxId: number | { $numberLong: string };
	name: string;
	birthDate: number | { $numberLong: string };
	relation: string;
	sex: string;
	age: number | null;
}

export interface PersonalPropertyData {
	buildings: BuildingData[];
	cars: CarData[];
	carsEmbargoes: CarDebtData[];
	registeredTrademarks: string[];
}

export interface BuildingData {
	landSurface: number;
	buildingSurface: number;
	address: string;
}

export interface CarData {
	licencePlate: string;
	buyed: number | { $numberLong: string };
	model: string;
	brand: string;
	origin: string;
	year: number;
	type: string;
	manufactured: number | { $numberLong: string };
	inPossession: boolean;
}

export interface CarDebtData {
	licensePlate: string;
	debt: string;
	valuation: string;
	brand: string;
	province: string;
}

export interface TaxData {
	// period: string;
	// autonomous: number;
	// monotribute: number;
	// contriSocial: number;
	// contriAutonomous: number;
	// segSocial: number;
	contributions: ContributionData[];
	contributionsEmployer: ContributionsEmployerData[];
	gciaInscription: boolean;
	gciaInscriptionCondition: string;
	gciaInscriptionDate: number;
	ivaInscription: boolean;
	ivaInscriptionCondition: string;
	ivaInscriptionDate: number;
	history: HistoryContributionData[];

	autonomousDate: number;
	autonomous: number;
	autonomousAct: string;
	monotribute: iMonotribute;
}

export interface HistoryContributionData {
	category: string;
	code: string;
	finishDate: number | { $numberLong: string };
	gcia: string;
	inSociety: boolean;
	iva: string;
	startDate: number | { $numberLong: string };
	type: string;
}

export interface FinancialSituationData {
	veraz: Veraz | null;
	operativeBanks: BankData[];
	bcraInfo: BankData[];
	bouncedChecks: CheckData[];
	bankDebtors: string[];
	bankruptcy24m: string | null;
	banks: string;
	banksAmount: string;
	checks24m: string | null;
	lawsuits24m: string | null;
	monthlyComparison: string | null;
	nonPaid6m: string;
	nonPaid6mAmount: string;
	worstSituation: string;
	worstSituationPercentage: string;
	ansesBenefits: string | null;
	historicalDebt: HistoricalDebt[];
}

export interface Veraz {
	banksObligations24m: number;
	category: string;
	incomePredictor: string;
	incomePredictorRange: string;
	incomePredictorText: string;
	message: string;
	amountObligations24m: number;
	// OBLIGATIONS VIGENTES CON BANCOS
	activeObsBa: ActiveObsBa[];
	ok: boolean;
	scoreRange: number;
	scoreSegment: string;
	scoreText: string;
	tokenCA: string;
}

export interface BankData {
	name: string;
	situation: string;
	amount?: string;
	period?: number;
	loan?: number;
	type?: BankDataType;
}

export enum BankDataType {
	BANKING_ENTITY = "BANKING_ENTITY",
	FINANCIAL = "FINANCIAL",
	UNKNOWN = "UNKNOWN",
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

export interface HistoricalDebt {
	period: number;
	amount: number | string;
}

export interface ActiveObsBa {
	entity: string;
	amount: number;
	date: number;
}

export interface OfficialBolletinData {
	bulletin: BulletinData[];
	embargoes: EmbargoData[];
	participationSocietal: ParticipationData[];
	trialsActor: TrialData[];
	trialsDefendant: TrialData[];
}

export interface BulletinData {
	source: string;
	rz: string;
	date: number;
	report: string;
}

export interface EmbargoData {
	date: number;
	jobNumber: number;
	proceedings: string;
	liftingDate: number;
	jobDate: number;
	cover: string;
	court: string;
	adress: string;
	phone: string;
}

export interface ParticipationData {
	source: string;
	publishDate: number;
	constitutionDate: number;
	charge: string;
	file: string;
	rz: string;
	bulletinId: number;
}

export interface TrialData {
	defendant: string;
	rol: string;
	proceedings: string;
	text: string;
	date: number;
	actor: string;
	province: string;
	peoples: string;
	object: string;
	court: string;
}
