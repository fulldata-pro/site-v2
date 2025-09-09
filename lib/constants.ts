export enum ServicesType {
  PEOPLE = "people",
  COMPANIES = "companies",
  VEHICLES = "vehicles",
  PHONES = "phones",
  BANKS = "banks",
  OSINT = "osint",
  IDENTITY = "identity",
}

export const ServicesLabel: Record<ServicesType, string> = {
  [ServicesType.PEOPLE]: "Personas",
  [ServicesType.COMPANIES]: "Empresas",
  [ServicesType.VEHICLES]: "Vehículos",
  [ServicesType.PHONES]: "Teléfonos",
  [ServicesType.BANKS]: "Bancos",
  [ServicesType.OSINT]: "OSINT",
  [ServicesType.IDENTITY]: "Identidad",
};

export enum TransactionStatus {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  REVIEW_NEEDED = "REVIEW_NEEDED",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
  EXPIRED = "EXPIRED",
  INVALID = "INVALID",
}
export const TransactionStatusLabel: Record<TransactionStatus, string> = {
  [TransactionStatus.PENDING]: "Pendiente",
  [TransactionStatus.PROCESSING]: "En Proceso",
  [TransactionStatus.REVIEW_NEEDED]: "Requiere Revisión",
  [TransactionStatus.SUCCESS]: "Completado",
  [TransactionStatus.ERROR]: "Error",
  [TransactionStatus.EXPIRED]: "Expirado",
  [TransactionStatus.INVALID]: "Inválido",
};

export enum RequestStatus {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  REVIEW_NEEDED = "REVIEW_NEEDED",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
  EXPIRED = "EXPIRED",
  INVALID = "INVALID",
}

export const RequestStatusLabel: Record<RequestStatus, string> = {
  [RequestStatus.PENDING]: "Pendiente",
  [RequestStatus.PROCESSING]: "En Proceso",
  [RequestStatus.REVIEW_NEEDED]: "Requiere Revisión",
  [RequestStatus.SUCCESS]: "Completado",
  [RequestStatus.ERROR]: "Error",
  [RequestStatus.EXPIRED]: "Expirado",
  [RequestStatus.INVALID]: "Inválido",
};

export enum PaymentMethod {
  CREDIT_CARD = "credit_card",
  MERCADO_PAGO = "mercado_pago",
  STRIPE = "stripe",
}
