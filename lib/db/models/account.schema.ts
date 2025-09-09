import { Schema, model, Document, Types, models } from 'mongoose';
import { addUidMiddleware } from '../helpers/uid-middleware';

interface IAccountBalance {
  currency: string;
  amount: number;
  updatedAt: Date;
}

interface IAccountUser {
  user: Types.ObjectId;
  role: string;
  addedAt: Date;
}

interface IAccountBenefit {
  benefit: Types.ObjectId;
  appliedAt: Date;
  expiresAt?: Date;
}

interface IServiceConfig {
  maxRequestsPerDay?: number;
  maxRequestsPerMonth?: number;
  webhookEnabled?: boolean;
  apiEnabled?: boolean;
}

export interface IAccount extends Document {
  id: number;
  uid: string;
  name: string;
  taxId?: string;
  email: string;
  phone?: string;
  phonePrefix?: string;
  avatar?: string;
  address?: string;
  city?: string;
  zip?: string;
  state?: Types.ObjectId;
  country?: Types.ObjectId;
  activity?: string;
  incomeTaxType?: string;
  vatType?: string;
  type: 'individual' | 'business';
  status: 'active' | 'inactive' | 'suspended' | 'pending';
  balance: IAccountBalance[];
  verifiedAt?: Date;
  emailVerifiedAt?: Date;
  phoneVerifiedAt?: Date;
  fiscalVerifiedAt?: Date;
  serviceConfig?: IServiceConfig;
  webhooks?: any;
  users: IAccountUser[];
  benefits: IAccountBenefit[];
  referredBy?: Types.ObjectId;
  referralCode?: string;
  referralBalance?: number;
  expiration?: Date;
  createdBy?: Types.ObjectId;
  createdAt: Date;
  updatedAt?: Date;
}

const AccountBalanceSchema = new Schema<IAccountBalance>({
  currency: { type: String, required: true },
  amount: { type: Number, default: 0 },
  updatedAt: { type: Date, default: Date.now }
}, { _id: false });

const AccountUserSchema = new Schema<IAccountUser>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  role: { type: String, default: 'member' },
  addedAt: { type: Date, default: Date.now }
}, { _id: false });

const AccountBenefitSchema = new Schema<IAccountBenefit>({
  benefit: { type: Schema.Types.ObjectId, ref: 'Benefit', required: true },
  appliedAt: { type: Date, default: Date.now },
  expiresAt: { type: Date }
}, { _id: false });

const ServiceConfigSchema = new Schema<IServiceConfig>({
  maxRequestsPerDay: { type: Number },
  maxRequestsPerMonth: { type: Number },
  webhookEnabled: { type: Boolean, default: false },
  apiEnabled: { type: Boolean, default: false }
}, { _id: false });

const AccountSchema = new Schema<IAccount>({
  id: { type: Number, required: true, unique: true },
  uid: { type: String, unique: true },
  name: { type: String, required: true },
  taxId: { type: String },
  email: { type: String, required: true },
  phone: { type: String },
  phonePrefix: { type: String },
  avatar: { type: String },
  address: { type: String },
  city: { type: String },
  zip: { type: String },
  state: { type: Schema.Types.ObjectId, ref: 'Province' },
  country: { type: Schema.Types.ObjectId, ref: 'Country' },
  activity: { type: String },
  incomeTaxType: { type: String },
  vatType: { type: String },
  type: { 
    type: String, 
    enum: ['individual', 'business'],
    default: 'individual'
  },
  status: { 
    type: String, 
    enum: ['active', 'inactive', 'suspended', 'pending'],
    default: 'pending'
  },
  balance: [AccountBalanceSchema],
  verifiedAt: { type: Date },
  emailVerifiedAt: { type: Date },
  phoneVerifiedAt: { type: Date },
  fiscalVerifiedAt: { type: Date },
  serviceConfig: ServiceConfigSchema,
  webhooks: { type: Schema.Types.Mixed },
  users: [AccountUserSchema],
  benefits: [AccountBenefitSchema],
  referredBy: { type: Schema.Types.ObjectId, ref: 'Account' },
  referralCode: { type: String, unique: true, sparse: true },
  referralBalance: { type: Number, default: 0 },
  expiration: { type: Date },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date }
}, { 
  collection: 'accounts',
  timestamps: false
});

// Agregar middleware para generar uid desde _id
addUidMiddleware(AccountSchema);

export default (models.Account as any) || model<IAccount>('Account', AccountSchema);