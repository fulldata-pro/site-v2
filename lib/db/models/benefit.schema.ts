import { Schema, model, Document, Types, models } from 'mongoose';
import { addUidMiddleware } from '../helpers/uid-middleware';

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
  startDate?: Date;
  endDate?: Date;
  beneficiaries?: number;
  uses?: Types.ObjectId[];
  minimumPurchase?: number;
  selfApply?: boolean;
  createdBy?: Types.ObjectId;
  createdAt: Date;
  updatedBy?: Types.ObjectId;
  updatedAt?: Date;
  deletedBy?: Types.ObjectId;
  deletedAt?: Date;
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
  uid: { type: String, unique: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  termsAndConditions: { type: String },
  code: { type: String, required: true, unique: true },
  advantage: { type: AdvantageSchema, required: true },
  isEnabled: { type: Boolean, default: true },
  startDate: { type: Date },
  endDate: { type: Date },
  beneficiaries: { type: Number },
  uses: [{ type: Schema.Types.ObjectId, ref: 'Account' }],
  minimumPurchase: { type: Number },
  selfApply: { type: Boolean, default: false },
  createdBy: { type: Schema.Types.ObjectId, ref: 'Admin' },
  createdAt: { type: Date, default: Date.now },
  updatedBy: { type: Schema.Types.ObjectId, ref: 'Admin' },
  updatedAt: { type: Date },
  deletedBy: { type: Schema.Types.ObjectId, ref: 'Admin' },
  deletedAt: { type: Date }
}, { 
  collection: 'benefits',
  timestamps: false
});

// Agregar middleware para generar uid desde _id
addUidMiddleware(BenefitSchema);

export default (models.Benefit as any) || model<IBenefit>('Benefit', BenefitSchema);