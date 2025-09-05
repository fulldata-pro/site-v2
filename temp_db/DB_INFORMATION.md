# Database Schema

## Database Schema Creation Prompt

Create a database schema based on the following Mongoose models. The database is designed for a service-based platform that manages user accounts, financial transactions, and service-related operations. The schema should include all fields with their respective data types and references to other models.

## Core Entities

Admins (DBAdmin): Manages administrators of the system with defined roles.

Fields: id: Number, uid: String, name: String, avatar: String, phone: String, email: String, password: String, status: String, role: String, createdBy: ObjectId, createdAt: Number, updatedBy: ObjectId, updatedAt: Number, deletedBy: ObjectId, deletedAt: Number.

Relationships: createdBy, updatedBy, and deletedBy reference the ADMINS collection.

Users (DBUser): Represents platform users.

Fields: id: Number, uid: String, accounts: [ObjectId], email: String, password: String, firstName: String, lastName: String, avatar: String, phone: String, phonePrefix: String, createdAt: Number, updatedAt: Number, deletedAt: Number.

Relationships: accounts is an array of ObjectIds referencing the ACCOUNTS collection.

Accounts (DBAccount): The central entity for customers, which can be individuals or legal entities.

Fields: id: Number, uid: String, name: String, taxId: String, email: String, phone: String, phonePrefix: String, avatar: String, address: String, city: String, zip: String, state: ObjectId, country: ObjectId, activity: String, incomeTaxType: String, vatType: String, type: String, status: String, balance: [AccountBalance], verifiedAt: Number, emailVerifiedAt: Number, phoneVerifiedAt: Number, fiscalVerifiedAt: Number, serviceConfig: ServiceConfigSchema, webhooks: Mixed, users: [AccountUser], benefits: [AccountBenefit], referredBy: ObjectId, referralCode: String, referralBalance: Number, expiration: Number, createdBy: ObjectId, createdAt: Number, updatedAt: Number.

Relationships: state references PROVINCES, country references COUNTRIES, referredBy and benefits.benefit reference ACCOUNTS and BENEFITS respectively. users.user references USERS. createdBy references USERS.

Financial and Service Schemas
Receipts (DBReceipt): Details of payment transactions.

Fields: id: Number, uid: String, status: String, statusMessage: String, amount: Number, total: Number, totalUSD: Number, subtotal: Number, subtotalUSD: Number, currency: String, exchangeRate: Number, extra: [ReceiptExtra], discount: ReceiptDiscount, searches: [ReceiptSearches], paymentMethod: ObjectId, transactionId: String, transactionUrl: String, benefit: ObjectId, account: ObjectId, statement: ObjectId, createdBy: ObjectId, createdAt: Number, updatedAt: Number, expiredAt: Number, deletedAt: Number.

Relationships: paymentMethod references PAYMENT_METHODS, benefit references BENEFITS, account references ACCOUNTS, statement references STATEMENTS, and createdBy references USERS.

Statements (DBStatement): Records of account actions.

Fields: id: Number, uid: String, data: Object, file: ObjectId, account: ObjectId, createdBy: ObjectId, updatedBy: ObjectId, createdAt: Number, updatedAt: Number.

Relationships: file references FILES, account references ACCOUNTS, createdBy and updatedBy reference USERS.

Movimientos (DBMovement): Tracks transactions and service usage.

Fields: id: Number, uid: String, description: String, status: String, searches: [MovementSearch], request: ObjectId, receipt: ObjectId, account: ObjectId, createdBy: ObjectId, createdAt: Number, updatedAt: Number, expired: Boolean, expirationAt: Number, deletedAt: Number.

Relationships: searches.proxy references PROXIES, request references REQUESTS, receipt references RECEIPTS, account references ACCOUNTS, and createdBy references USERS.

Solicitudes (DBRequest): Records requests for specific services.

Fields: id: Number, uid: String, type: String, tag: ObjectId, countryCode: String, isDuplicated: Boolean, metadata: Object, prompts: Object, intelligenceData: Mixed, response: String, error: Object, expiresAt: Date, status: String, version: String, relations: [RequestRelation], account: ObjectId, user: ObjectId, createdAt: Number, updatedAt: Number, deletedAt: Number.

Relationships: tag references ACCOUNT_TAGS, relations.request references REQUESTS, account references ACCOUNTS, and user references USERS.

Proxies (DBProxy): Defines available services and their costs.

Fields: id: Number, uid: String, name: String, countryCode: String, services: [ProxyService], currency: String, createdAt: Number, updatedAt: Number, deletedAt: Number.

Relationships: services.updatedBy references ADMINS.

Beneficios (DBBenefit): Stores information about special offers and discounts.

Fields: id: Number, uid: String, name: String, description: String, termsAndConditions: String, code: String, advantage: Advantage, isEnabled: Boolean, startDate: Number, endDate: Number, beneficiaries: Number, uses: [ObjectId], minimumPurchase: Number, selfApply: Boolean, createdBy: ObjectId, createdAt: Number, updatedBy: ObjectId, updatedAt: Number, deletedBy: ObjectId, deletedAt: Number.

Relationships: uses references ACCOUNTS, createdBy, updatedBy, and deletedBy reference ADMINS.

Referrals (DBReferral): Tracks referral-based transactions.

Fields: id: Number, uid: String, type: String, amount: Number, balance: Number, account: ObjectId, referred: ObjectId, receipt: ObjectId, createdAt: Number, updatedAt: Number, deletedAt: Number.

Relationships: account and referred reference ACCOUNTS, and receipt references RECEIPTS.

Account APIs (DBAccountApi): Manages API access for accounts.

Fields: id: Number, uid: String, active: Boolean, account: ObjectId, apiKey: String, webhook: String, createdBy: ObjectId, updatedBy: ObjectId, deletedBy: ObjectId, createdAt: Number, updatedAt: Number, deletedAt: Number.

Relationships: account references ACCOUNTS, and createdBy, updatedBy, and deletedBy reference USERS.

Static and Utility Schemas
Países (DBCountry): Stores country data.

Fields: id: Number, uid: String, name: String, alpha2Code: String, alpha3Code: String, callingCode: String, createdAt: Number, updatedAt: Number.

Provincias (DBProvince): Stores province/state data.

Fields: id: Number, uid: String, name: String, country: ObjectId, createdAt: Number, updatedAt: Number.

Relationships: country references COUNTRIES.

Monedas (DBCurrency): Defines currencies and exchange rates.

Fields: id: Number, uid: String, name: String, decimal: Number, exchangeRate: [ExchangeRate], discounts: [CurrencyDiscount], paymentMethod: ObjectId, createdAt: Number, updatedAt: Number.

Relationships: paymentMethod references PAYMENT_METHODS.

Métodos de pago (DBPaymentMethod): Lists available payment methods.

Fields: id: Number, uid: String, type: String, name: String, description: String, icon: String, color: String, credentials: Object, isEnabled: Boolean, createdAt: Number, updatedAt: Number, deletedAt: Number.

Archivos (DBFile): Handles file storage metadata.

Fields: id: Number, uid: String, fileName: String, fileSize: Number, fileType: String, urlView: String, urlDownload: String, storageKey: String, createdAt: Number, updatedAt: Number, deletedAt: Number.

Parámetros (DBParameter): Stores system-wide configuration parameters.

Fields: id: Number, uid: String, country: ObjectId, activities: [ParameterName], incomeTaxType: [ParameterName], salaryRange: [SalarySchema], vatType: [ParameterName].

Relationships: country references COUNTRIES.

Etiquetas de cuenta (DBAccountTag): Allows accounts to categorize services.

Fields: id: Number, uid: String, name: String, type: String, account: ObjectId, createdBy: ObjectId, createdAt: Number, updatedAt: Number, deletedAt: Number.

Relationships: account references ACCOUNTS and createdBy references USERS.

Invitaciones (DBInvitation): Manages invitations for users to join accounts.

Fields: id: Number, uid: String, account: ObjectId, user: ObjectId, email: String, role: String, status: String, createdBy: ObjectId, createdAt: Number, updatedAt: Number, expiredAt: Number, deletedAt: Number.

Relationships: account references ACCOUNTS, user references USERS, and createdBy references USERS.
