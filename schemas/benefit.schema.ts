import { Schema, model, Document, Types } from 'mongoose';

interface IAdvantage {
  type: 'percentage' | 'fixed' | 'credits';
  value: number;
}

export interface IBenefit extends Document {
  id: number;
  uid: string;
  name: string;
  description: string;
  termsAndConditions?: string;
  code: string;
  advantage: IAdvantage;
  isEnabled: boolean;
  startDate?: number;
  endDate?: number;
  beneficiaries?: number;
  uses?: Types.ObjectId[];
  minimumPurchase?: number;
  selfApply?: boolean;
  createdBy?: Types.ObjectId;
  createdAt: number;
  updatedBy?: Types.ObjectId;
  updatedAt?: number;
  deletedBy?: Types.ObjectId;
  deletedAt?: number;
}

const AdvantageSchema = new Schema<IAdvantage>({
  type: { 
    type: String, 
    enum: ['percentage', 'fixed', 'credits'],
    required: true 
  },
  value: { type: Number, required: true }
}, { _id: false });

const BenefitSchema = new Schema<IBenefit>({
  id: { type: Number, required: true, unique: true },
  uid: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  termsAndConditions: { type: String },
  code: { type: String, required: true, unique: true },
  advantage: { type: AdvantageSchema, required: true },
  isEnabled: { type: Boolean, default: true },
  startDate: { type: Number },
  endDate: { type: Number },
  beneficiaries: { type: Number },
  uses: [{ type: Schema.Types.ObjectId, ref: 'Account' }],
  minimumPurchase: { type: Number },
  selfApply: { type: Boolean, default: false },
  createdBy: { type: Schema.Types.ObjectId, ref: 'Admin' },
  createdAt: { type: Number, default: Date.now },
  updatedBy: { type: Schema.Types.ObjectId, ref: 'Admin' },
  updatedAt: { type: Number },
  deletedBy: { type: Schema.Types.ObjectId, ref: 'Admin' },
  deletedAt: { type: Number }
}, { 
  collection: 'benefits',
  timestamps: false
});

export default model<IBenefit>('Benefit', BenefitSchema);