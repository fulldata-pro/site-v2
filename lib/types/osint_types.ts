export type OsintProps<T extends object = any> = {
	module: OsintModule<T>;
};

export type Osint = {
	data: OsintModule[];
};

export type OsintModule<T extends object = any> = {
	module: string;
	query: string;
	data: T;
	from: string;
	front_schemas: OsintFrontSchema[];
	reliable_source: boolean;
	spec_format: OsintSpectFormat[];
	status: "found";
};

export type OsintFrontSchema = {
	module: string;
	body: unknown;
	image?: string;
	map?: OsintFrontMap[];
	tags: OsintFrontTag[];
	timeline: OsintFrontTimeline[];
};

export type OsintFrontMap = {
	type: "lat_lng";
	lat_lng: [number, number];
	popup: { title: string; subtitle: string; address: string; date: string };
	icon: { awesome_marker: "True"; extra_classes: string; icon_color: string; location_type: string; marker_color: string; prefix: string };
};

export type OsintFrontTag = {
	tag: string;
	url?: string;
};

export type OsintFrontTimeline = {
	registered: boolean;
	registered_date: null;
	last_seen: boolean;
	last_seen_date: null;
	groups: unknown;
	group_years: unknown;
	group_items: unknown;
};

export type OsintSpectFormat = {
	[key: string]: SpectFormat | SpectFormat[];
};

export type SpectFormat = ValueOfType & {
	key?: string;
	proper_key: string;
};

export type ValueOfType =
	| { type: "bool"; value: boolean }
	| { type: "str"; value: string }
	| { type: "datetime"; value: string }
	| { type: "dict"; value: any }
	| { type: "list"; value: any[] }
	| { type: "int"; value: number };

/// All Data Interfaces
export interface Query {
	value: string;
	type: string;
}

export interface AboutMe {
	email: string;
	user_name: string;
	social_signup: boolean;
}
export interface Airbnb {
	loc: LocAirbnb;
	user: UserAirbnb;
}

export interface LocAirbnb {
	listing: any[];
	reviews_from_guest: any[];
}

export interface UserAirbnb {
	about: any;
	birthDecade: any;
	canViewProfilePicture: boolean;
	createdAt: string;
	facebookConnected: boolean;
	favoriteSong: any;
	fieldRankings: string[];
	first_name: string;
	flaggedByViewer: any;
	guestType: string;
	hasIdentityBadge: boolean;
	hasProfilePicture: boolean;
	hostedExperiences: [];
	identityVerificationTypes: string[];
	image_url: string;
	interestsList: { isFeatured: boolean; title: string; typeV2: string }[];
	isAutoTranslationEnabled: boolean;
	isExperienceHost: boolean;
	isHomeHost: boolean;
	isSuperhost: boolean;
	isViewerProfileOwner: boolean;
	languages: [];
	localizedAbout: any;
	localizedBiographyTitle: any;
	localizedBreakfast: any;
	localizedFunFact: any;
	localizedHostHospitality: any;
	localizedObsession: any;
	localizedPets: any;
	localizedStayUniqueness: any;
	localizedUselessSkills: any;
	localizedWastedTime: any;
	localizedWork: any;
	location: any;
	managedListings: [];
	managedListingsTotalCount: 0;
	pastTrips: any;
	phone_number: string;
	preference: { showBirthDecade: boolean; showPastTrips: boolean };
	profilePictureUrl: string;
	recognitions: any;
	reputationStats: { description: string }[];
	reviewHighlightsFromGuests: { count: 0; isAutoTranslationEnabled: boolean; reviews: string[] };
	reviewHighlightsFromHosts: { count: 0; isAutoTranslationEnabled: boolean; reviews: string[] };
	reviewsAuthoredAsGuest: { count: 0; isAutoTranslationEnabled: boolean; reviews: string[] };
	reviewsReceivedFromGuests: { count: 0; isAutoTranslationEnabled: boolean; reviews: string[] };
	reviewsReceivedFromHosts: { count: 0; isAutoTranslationEnabled: boolean; reviews: string[] };
	school: any;
	smartName: string;
	sportsList: { isFeatured: boolean; title: string; typeV2: string }[];
	timeAsHost: { years: any; months: any };
	timeAsUser: { years: number; months: 0 };
	travelGuides: any[];
	userId: string;
	userInterests: any;
	user_id: number;
	work: string;
}

export interface Apple {
	has_multiple_emails: boolean;
	main_email: string;
	phone_numbers: string[];
}

export type AskFm = any;

export interface Duolingo {
	users: DuolingoData[];
}

export interface DuolingoData {
	courses: DuolingoCourse[];
	fromLanguage: string;
	roles: string[];
	streak: number;
	creationDate: number;
	picture: string;
	totalXp: number;
	learningLanguage: string;
	name: string;
	hasRecentActivity15: boolean;
	id: number;
	hasPlus: boolean;
	username: string;
}

export interface DuolingoCourse {
	learningLanguage: string;
	fromLanguage: string;
	crowns: number;
	xp: number;
	id: string;
	authorId: string;
	title: string;
	healthEnabled: boolean;
	preload: boolean;
}

export interface Etsy {
	name: string;
	avatar: string;
}

export interface Facebook {
	name: string;
	type: string;
	profile_pic: string;
	hints: string[];
}

export interface Fitbit {
	name: string;
	avatar: string;
	id: string;
	friends: any[];
}

export interface Flickr {
	data: FlickrDataData;
	exportMetaType: string;
}

export interface FlickrDataData {
	_flickrModelRegistry: string;
	username: string;
	realname: string;
	iconfarm: number;
	iconserver: string;
	buddyicon: FlickrBuddyicon;
	dateJoined: FlickrDateJoined;
	id: string;
}

export interface FlickrBuddyicon {
	data: FlickrBuddyiconData;
	exportMetaType: string;
}

export interface FlickrBuddyiconData {
	retina: string;
	large: string;
	medium: string;
	small: string;
	default: string;
}

export interface FlickrDateJoined {
	data: string;
	exportMetaType: string;
}

export type Foursquare = any;

export interface Garmin {
	profileList: GarminProfileList[];
	originalKeyword: string;
	effectiveKeyword: string;
	start: number;
	limit: number;
}

export interface GarminProfileList {
	userId: number;
	profileImageUrlMedium: string | null;
	profileImageUrlSmall: string | null;
	location: string | null;
	fullName: string | null;
	displayName: string;
	userLevel: number;
	profileVisibility: number;
	connectionRequestId: any;
	connectionRequestorId: any;
	connectionStatus: number;
	userPro: boolean;
	mutualConnectionsCount: number;
	source: any;
	associatedDate: any;
}

export interface Github {
	login: string;
	id: number;
	node_id: string;
	avatar_url: string;
	gravatar_id: string;
	url: string;
	html_url: string;
	followers_url: string;
	following_url: string;
	gists_url: string;
	starred_url: string;
	subscriptions_url: string;
	organizations_url: string;
	repos_url: string;
	events_url: string;
	received_events_url: string;
	type: string;
	site_admin: boolean;
	name: string | null;
	company: string | null;
	blog: string;
	location: string | null;
	email: string | null;
	hireable: string | null;
	bio: string | null;
	twitter_username: any;
	public_repos: number;
	public_gists: number;
	followers: number;
	following: number;
	created_at: string;
	updated_at: string;
}

export interface Google {
	devices: any[];
	email: string;
	gaia_id: string;
	google_services: string[];
	is_enterprise: boolean;
	lastUpdate: string;
	last_name?: string;
	first_name?: string;
	name: string;
	photo: string;
}

export interface GoogleMapsLocation {
	address: string;
	tags: string[];
	cost: number;
	name: string;
	id: string;
	types: GoogleMapsType[];
	position: GoogleMapsPosition;
}

export interface GoogleMapsPosition {
	longitude: number;
	latitude: number;
}

export interface GoogleMapsType {
	icon_color: GoogleMapsIconColor;
	name: string;
	icon: string;
	id: string;
	bg_color: string;
}

export enum GoogleMapsIconColor {
	Black = "black",
	White = "white",
}

export interface GoogleServices {
	Maps: string;
	Calendar: string;
	"Plus Archive.org": string;
}

export interface Gravatar {
	entry: GravatarEntry[];
}

export interface GravatarEntry {
	hash: string;
	requestHash: string;
	profileUrl: string;
	preferredUsername: string;
	thumbnailUrl: string;
	photos: GravatarPhoto[];
	displayName: string;
	urls: any[];
	share_flags: GravatarShareFlags;
}

export interface GravatarPhoto {
	value: string;
	type: string;
}

export interface GravatarShareFlags {
	search_engines: boolean;
}

export interface Linkedin {
	id: string;
	displayName: string;
	firstName: string;
	lastName: string;
	phoneNumbers: any[];
	headline: string;
	companyName: string;
	location: string;
	photoUrl: string;
	linkedInUrl: string;
	reportProfileUrl: string;
	connectionCount: number;
	isConnectionCountObfuscated: boolean;
	connectionDegree: string;
	connectionStatus: string;
	skills: string[];
	locale: LinkedinLocale;
	schools: LinkedinSchools;
	positions: LinkedinPositions;
	skillEndorsements: LinkedinSkillEndorsements;
	newsMentions: LinkedinNewsMentions;
	userGeneratedContents: LinkedinUserGeneratedContents;
	isPublic: boolean;
}

export interface LinkedinLocale {
	country: string;
	language: string;
}

export interface LinkedinNewsMentions {
	newsMentionCount: number;
	newsMentions: any[];
}

export interface LinkedinPositions {
	positionsCount: number;
	positionHistory: LinkedinPositionHistory[];
}

export interface LinkedinPositionHistory {
	title: string;
	startEndDate: PositionHistoryStartEndDate;
	company: LinkedinCompany;
	companyName: string;
	linkedInUrl: string;
	description?: string;
	companyLogo?: string;
}

export interface LinkedinCompany {
	companyName: string;
	linkedInUrl: string;
	companyLogo?: string;
}

export interface PositionHistoryStartEndDate {
	start: LinkedinPositionDate;
	end: LinkedinPositionDate;
}

export interface LinkedinPositionDate {
	month?: number;
	year?: number;
}

export interface LinkedinSchools {
	educationsCount: number;
	educationHistory: LinkedinEducationHistory[];
}

export interface LinkedinEducationHistory {
	school: LinkedinSchool;
	degreeName: string;
	startEndDate: EducationHistoryStartEndDate;
	fieldOfStudy: string;
	schoolName: string;
	linkedInUrl: string;
	schoolLocation?: string;
	schoolLogo?: string;
}

export interface LinkedinSchool {
	schoolName: string;
	linkedInUrl: string;
	schoolLocation?: string;
	schoolLogo?: string;
}

export interface EducationHistoryStartEndDate {
	start: LinkedinEducationDate;
	end: LinkedinEducationDate;
}

export interface LinkedinEducationDate {
	year: number;
}

export interface LinkedinEndorser {
	id: string;
	displayName: string;
	firstName: string;
	lastName: string;
	photoUrl: string;
	locale: LinkedinLocale;
	schools: LinkedinSchools;
	positions: LinkedinPositions;
	skillEndorsements: LinkedinSkillEndorsements;
	newsMentions: LinkedinNewsMentions;
	userGeneratedContents: LinkedinUserGeneratedContents;
	isPublic: boolean;
}

export interface LinkedinSkillEndorsement {
	skillName: string;
	endorsementCount: number;
	endorsers: LinkedinEndorser[];
}

export interface LinkedinSkillEndorsements {
	skillEndorsementsCount: number;
	skillEndorsements: LinkedinSkillEndorsement[];
}

export interface LinkedinUserGeneratedContents {
	userGeneratedContentCount: number;
	userGeneratedContents: LinkedinUserGeneratedContent[];
}

export interface LinkedinUserGeneratedContent {
	description: string;
	url: string;
	createdOn: LinkedinCreatedOn;
	thumbnails: any[];
	mediaCategory: string;
}

export interface LinkedinCreatedOn {
	month: number;
	year: number;
	day: number;
}

export interface Maps {
	photos: any[];
	reviews: GoogleMapsReview[];
	stats: { [key: string]: number };
}

export interface GoogleMapsReview {
	approximative_date: string;
	rating: number;
	id: string;
	guided_answers: any[];
	comment: any;
	location: GoogleMapsLocation;
}

export interface Microsoft {
	emails_hints: any[];
	phones_hints: any[];
	devices: any[];
	live_account: boolean;
	name: string;
	location: string;
	cid: string;
	date_created: string;
	date_modified: string;
}

export interface MyFitnessPal {
	id: string;
	username: string;
	created_at: string;
	is_admin: boolean;
	is_scammer: boolean;
	viewer_is_friend: boolean;
	image_count: number;
	friends_count: number;
	viewer_is_blocked: boolean;
	profile_is_blocked: boolean;
	friends: any[];
	location_preferences: MyFitnessPalLocationPreferences;
	privacy_preferences: MyFitnessPalPrivacyPreferences;
	profiles: MyFitnessPalProfile[];
}

export interface MyFitnessPalLocationPreferences {
	time_zone: string;
	country_code: string;
	locale: string;
	postal_code: string;
	state: string;
	city: string;
}

export interface MyFitnessPalPrivacyPreferences {
	friend_visibility: boolean;
	diary_visibility: string;
	profile_visibility: string;
	yir_visibility: string;
	age_visibility: string;
}

export interface MyFitnessPalProfile {
	type: string;
	main_image_url: string;
	birthdate: any;
	sex: string;
	headline: string;
	about: string;
	why: string;
	inspirations: string[];
}

export interface Nike {
	upmId: string;
	block_status: string;
	relationship_status: string;
	screenname: string;
	"name.latin.given": string;
	"name.latin.family": string;
	"social.visibility": string;
	"social.allowtagging": boolean;
	"location.visibility": string;
}

export interface Notion {
	value: {
		value: {
			id: string;
			version: number;
			email: string;
			profile_photo: string;
			onboarding_completed: boolean;
			name: string;
		};
		role: string;
	};
}

export type ProtoMail = any;

export interface RunKeeper {
	uuid: string;
	displayName: string;
	publicCurrMonthActivityCount: number;
	publicTotalActivities: number;
	avatarUrl: string;
	username: any;
	userId: number;
	publicActivities: number;
}

export type Runtastic = any;

export interface Sellix {
	subscription: any;
	groups: any[];
	products: any[];
	items: any[];
	categories: any[];
	shop: SellixShop;
	username: string;
}

export interface SellixShop {
	id: number;
	user_id: number;
	type: string;
	name: string;
	avatar: any;
	currency: string;
	default_currency: any;
	vat_percentage: string;
	tax_configuration: string;
	display_tax_on_storefront: number;
	display_tax_custom_fields: number;
	validation_only_for_companies: number;
	validate_vat_number: number;
	prices_tax_inclusive: number;
	transaction_threshold: string;
	notify_trial_ending: number;
	notify_upcoming_renewal: number;
	notify_subscription_renewal_failure: number;
	order_emails: number;
	subscription_grace_period: number;
	paypal_credit_card: number;
	force_paypal_email_delivery: number;
	paypal_merchant_id: any;
	binance_id: any;
	walletconnect_id: any;
	dark_mode: number;
	discord_link: any;
	twitter_link: any;
	instagram_link: any;
	facebook_link: any;
	telegram_link: any;
	youtube_link: any;
	reddit_link: any;
	tiktok_link: any;
	search_enabled: number;
	sort_enabled: number;
	cart_enabled: number;
	cart_maximum_checkout: string;
	hide_out_of_stock: number;
	google_analytics_tracking_id: any;
	crisp_website_id: any;
	center_product_titles: number;
	center_group_titles: number;
	popup_message: any;
	verified: number;
	on_hold: number;
	terms_of_service: string;
	custom_embed: number;
	custom_theme: number;
	helpspace_client_id: any;
	helpspace_token: any;
	description_youtube_only: number;
	description_skip_default_image: number;
	hide_stock_counter: number;
	image_width: number;
	image_height: number;
	default_sort: string;
	description_image: number;
	hide_products_sold: number;
	service_date_from: string;
	cards_type: string;
	setup_wizard: number;
	notices_banner: string;
	affiliate_revenue_percent: number;
	created_at: number;
	image_name: any;
	image_storage: any;
	cloudflare_image_id: any;
	marketplace_verified: number;
	feedback: SellixFeedback;
	average_score: any;
	products_sold_count: number;
	theme: SellixTheme;
	tax_configuration_data: any[];
	trusted_checks: SellixTrustedChecks;
	store_code_required: boolean;
}

export interface SellixFeedback {
	positive: number;
	neutral: number;
	negative: number;
	total: number;
}

export interface SellixTheme {
	primary_color: string;
	secondary_color: string;
	primary_font_color: string;
	secondary_font_color: string;
	font: string;
	style: string;
	embed_style: string;
	index: string;
	product_card: string;
	banner: string;
	footer: string;
	cards_in_row: number;
	cards_align: string;
	light_font_color: string;
	dark_font_color: string;
	light_color: string;
	dark_color: string;
	border_color: string;
	button_color: string;
	thin_color: string;
	sort: string;
	header: string;
	group_card: string;
	card_animation: string;
	logo: any;
	logo_storage: string;
	logo_cloudflare_image_id: any;
	background_image: any;
	background_image_storage: string;
	background_image_cloudflare_image_id: any;
}

export interface SellixTrustedChecks {
	identity_verified: boolean;
	sales_last14days_metric: string;
	feedback_appealed: number;
	feedback_appeal_ratio: number;
	feedback_score: any;
	no_chargeback_gateways: boolean;
	trusted_score: number;
}

export interface Skype {
	nodeProfileData: {
		avatarUrl: string;
		contactType: string;
		countryCode: string;
		name: string;
		skypeHandle: string;
		skypeId: string;
	};
}

export interface Strava {
	id: number;
	username: string | null;
	resource_state: number;
	firstname: string;
	lastname: string;
	bio: string | null;
	city: string;
	state: string;
	country: string;
	sex: string;
	premium: boolean;
	summit: boolean;
	created_at: string;
	updated_at: string;
	badge_type_id: number;
	profile_medium: string;
	profile: string;
	friend: any;
	follower: any;
	approve_followers: boolean;
	super_follower_boost_activities_in_feed: boolean;
	super_follower_notify_activities: boolean;
	super_follower_mute_in_feed: boolean;
	blocked: boolean;
	can_follow: boolean;
	eid: any;
	advanced_location: any[];
	gear: any[];
}

export interface Trello {
	id: string;
	aaId: string;
	activityBlocked: boolean;
	avatarHash: string;
	avatarUrl: string;
	bio: string;
	bioData: any;
	confirmed: boolean;
	fullName: string;
	idEnterprise: any;
	idEnterprisesDeactivated: any;
	idMemberReferrer: any;
	idPremOrgsAdmin: any;
	initials: string;
	memberType: string;
	nonPublic: TrelloNonPublic;
	nonPublicAvailable: boolean;
	products: any[];
	url: string;
	username: string;
	status: string;
	aaBlockSyncUntil: any;
	aaEmail: any;
	aaEnrolledDate: any;
	avatarSource: any;
	credentialsRemovedCount: any;
	domainClaimed: any;
	email: any;
	gravatarHash: any;
	idBoards: any[];
	idOrganizations: any[];
	idEnterprisesAdmin: any[];
	limits: TrelloLimits;
	loginTypes: any;
	marketingOptIn: any;
	messagesDismissed: any;
	oneTimeMessagesDismissed: any;
	sessionType: any;
	prefs: any;
	trophies: any[];
	uploadedAvatarHash: any;
	uploadedAvatarUrl: any;
	premiumFeatures: string[];
	isAaMastered: boolean;
	ixUpdate: string;
}

export interface TrelloLimits {
	boards: TrelloBoards;
	orgs: TrelloBoards;
}

export interface TrelloBoards {
	totalPerMember: TrelloTotalPerMember;
}

export interface TrelloTotalPerMember {
	status: string;
	disableAt: number;
	warnAt: number;
}

export interface TrelloNonPublic {}

export interface Vivino {
	id: number;
	username: string;
	fullName: string;
	lastActivity: string;
	profilPicture: string;
	statistics: VivinoStatistics;
}

export interface VivinoStatistics {
	followers_count: number;
	followings_count: number;
	ratings_count: number;
	ratings_sum: number;
	reviews_count: number;
	purchase_order_count: number;
}

export type Yandex = {};

export interface Youtube {
	joined_date_indication: string;
	channel_url: string;
	profile_picture_url: string;
	channel_id: string;
	subscribers_count: string;
	channel_name: string;
}

export interface Taringa {
	id: string;
	created: string;
	type: string;
	username: string;
	firstname: string;
	lastname: string;
	birthday: string;
	avatar: string;
	background: string;
	site: string;
	gender: string;
	country: string;
	message: string;
	wallpaper: string;
	wallpaperMode: string;
	verified: boolean;
	deletedByUser: boolean;
	tags: any[];
	settings: TaringaSettings;
	customRankFrame: string;
	customLevelFrame: number;
	requiresTutorial: boolean;
	deletedOn: any;
	hardDeletedOn: any;
	hardDeleted: boolean;
	instantDelete: boolean;
	acceptedTyC: string;
	stories: number;
	followers: number;
	following: number;
	rank: string;
	latestStory: string;
	comments: number;
	state: TaringaState;
	suscriptions: number;
	gamification: TaringaGamification;
	tyc: TaringaTyc;
}

export interface TaringaGamification {
	inBeta: boolean;
	id: number;
	brainiacId: string;
	rank: string;
	level: number;
	xpProgressPercentage: number;
	deletedAt: any;
	equipment: TaringaState;
	nextLevelAt: number;
}

export interface TaringaState {}

export interface TaringaSettings {
	enableChatRequests: boolean;
}

export interface TaringaTyc {
	version: string;
	currentVersion: string;
	outdated: boolean;
}

export interface Vsco {
	id: number;
	username: string;
	picture: string;
	date_created: string;
	date_last_update: string;
	email: string;
	phone: string;
}

export interface Hibp {
	Name: string;
	Title: string;
	Domain: string;
	BreachDate: string;
	AddedDate: string;
	ModifiedDate: string;
	PwnCount: number;
	Description: string;
	LogoPath: string;
	DataClasses: string[];
	IsVerified: boolean;
	IsFabricated: boolean;
	IsSensitive: boolean;
	IsRetired: boolean;
	IsSpamList: boolean;
	IsMalware: boolean;
	IsSubscriptionFree: boolean;
}

export type EmailCheckers = {
	module: "emailchecker";
	query: Query;
	data: EmailCheckersData2 | EmailCheckersData[];
};

export interface EmailCheckersData2 {
	data: EmailCheckersData[];
	email: string;
	timestamp: number;
}

export interface EmailCheckersData {
	name: string;
	domain: string;
	phoneNumber: string;
	method: EmailCheckersMethod;
	frequent_rate_limit: boolean;
	rateLimit: boolean | null;
	exists: boolean;
	emailrecovery: any;
	others: any;
}

export enum EmailCheckersMethod {
	Empty = "",
	Login = "login",
	Other = "other",
	Others = "others",
	PasswordRecovery = "password recovery",
	Register = "register",
}
