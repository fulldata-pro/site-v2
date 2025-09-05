import { RequestStatus } from "@/interfaces/database/requests.interface";
import { AMLScreening } from "./data/aml-screening";

export * from "./data/aml-screening";
export * from "./data/document-verification";
export * from "./data/face-verification";
export * from "./data/ip-analytics";
export interface DiditAuth {
	iss: string;
	iat: number;
	sub: string;
	client_id: string;
	organization_id: string;
	expires_in: number;
	exp: number;
	access_token: string;
}

export interface DiditResponse {
	status: RequestStatus;
	session_id?: string;
	session_url?: string;
	vendor_data?: string;
	data?: any;
}

export interface DiditSession {
	session_id: string;
	session_number: number;
	session_token: string;

	// session_url: string;
	url?: string;
	session_url?: string;
	status: DiditSessionStatus;
	metadata: any;
	nfc: any;
	phone: any;
	poa: any;
	aml: AMLScreening | null;
	id_verification: DiditIDVerification;
	face_match: DiditFaceMatch | null;
	liveness: DiditLiveness;
	ip_analysis: DiditIPAnalysis;
	features: DiditFeatureType[];
	reviews: DiditReview[];
	contact_details: any;
	expected_details: any;
	vendor_data: string;
	workflow_id: string;
	callback: string | null;
	created_at: string;
}

export enum DiditSessionStatus {
	NOT_STARTED = "NOT STARTED",
	IN_PROGRESS = "IN PROGRESS",
	APPROVED = "APPROVED",
	DECLINED = "DECLINED",
	KYC_EXPIRED = "KYC EXPIRED",
	IN_REVIEW = "IN REVIEW",
	EXPIRED = "EXPIRED",
	ABANDONED = "ABANDONED",
}

export interface DiditFaceMatch {
	score: number;
	source_image: string;
	source_image_session_id: string | null;
	status: string;
	target_image: string;
	warnings: DiditWarning[];
}

export interface DiditIDVerification {
	address: string;
	age: number;
	back_image: string;
	back_video: string;
	date_of_birth: string;
	date_of_issue: string | null;
	document_number: string;
	document_type: string;
	expiration_date: string;
	extra_fields: Record<string, any>;
	extra_files: any[];
	first_name: string;
	formatted_address: string;
	front_image: string;
	front_video: string;
	full_back_image: string;
	full_front_image: string;
	full_name: string;
	gender: string;
	issuing_state: string;
	issuing_state_name: string;
	last_name: string;
	marital_status: string;
	nationality: string;
	parsed_address: DiditParsedAddress;
	personal_number: string;
	place_of_birth: string;
	portrait_image: string;
	status: string;
	warnings: DiditWarning[];
}

export interface DiditParsedAddress {
	address_type: string | null;
	category: string;
	city: string;
	country: string;
	document_location: {
		latitude: number;
		longitude: number;
	};
	formatted_address: string;
	id: string;
	is_verified: boolean;
	label: string;
	postal_code: string;
	raw_results: any;
	region: string;
	street_1: string;
	street_2: string | null;
}

export interface DiditIPAnalysis {
	browser_family: string;
	device_brand: string;
	device_model: string;
	ip_address: string;
	ip_city: string;
	ip_country: string;
	ip_country_code: string;
	ip_state: string;
	is_data_center: boolean;
	is_vpn_or_tor: boolean;
	isp: string;
	latitude: number;
	locations_info: DiditLocationsInfo;
	longitude: number;
	organization: string;
	os_family: string;
	platform: string;
	status: string;
	time_zone: string;
	time_zone_offset: string;
	warnings: DiditWarning[];
}

export interface DiditLiveness {
	age_estimation: number;
	method: string;
	reference_image: string;
	score: number;
	status: string;
	video_url: string;
	warnings: DiditWarning[];
}

export interface DiditWarning {
	additional_data: any;
	feature?: string;
	log_type: string;
	long_description: string;
	risk: string;
	short_description: string;
}

export interface DiditReview {
	user: string;
	new_status: string;
	comment: string;
	created_at: string;
}

// "locations_info": {
//         "id_document": {
//           "distance_from_ip": {
//             "direction": "SE",
//             "distance": 2.32
//           },
//           "distance_from_poa_document": null,
//           "location": {
//             "latitude": -34.5973289,
//             "longitude": -58.39485
//           }
//         },
//         "ip": {
//           "distance_from_id_document": {
//             "direction": "SE",
//             "distance": 2.32
//           },
//           "distance_from_poa_document": null,
//           "location": {
//             "latitude": -34.60849,
//             "longitude": -58.37344
//           }
//         },
//         "poa_document": {
//           "distance_from_id_document": null,
//           "distance_from_ip": null,
//           "location": null
//         }
//       },
export interface DiditLocationsInfo {
	id_document: {
		distance_from_ip: {
			direction: string;
			distance: number;
		};
		distance_from_poa_document: null;
	};
	ip: {
		distance_from_id_document: {
			direction: string;
			distance: number;
		};
		distance_from_poa_document: any;
		location: {
			latitude: number;
			longitude: number;
		};
	};
	poa_document: {
		distance_from_id_document: null;
		distance_from_ip: null;
		location: null;
	};
}

export type DiditFeatureType = "ID_VERIFICATION" | "LIVENESS" | "FACE_MATCH" | "AML" | "IP_ANALYSIS" | string;
