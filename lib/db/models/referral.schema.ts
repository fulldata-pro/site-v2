import { Schema, model, Document, Types, models } from 'mongoose';
import { addUidMiddleware } from '../helpers/uid-middleware';

export interface IReferral extends Document {
  id: number;
  uid: string;
  type: 'credit' | 'debit';
  amount: number;
  balance: number;
  account: Types.ObjectId;
  referred?: Types.ObjectId;
  receipt?: Types.ObjectId;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

const ReferralSchema = new Schema<IReferral>({
  id: { type: Number, required: true, unique: true },
  uid: { type: String, unique: true },
  type: { 
    type: String, 
    enum: ['credit', 'debit'],
    required: true 
  },
  amount: { type: Number, required: true },
  balance: { type: Number, required: true },
  account: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
  referred: { type: Schema.Types.ObjectId, ref: 'Account' },
  receipt: { type: Schema.Types.ObjectId, ref: 'Receipt' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
  deletedAt: { type: Date }
}, { 
  collection: 'referrals',
  timestamps: false
});

// Agregar middleware para generar uid desde _id
addUidMiddleware(ReferralSchema);

export default (models.Referral as any) || model<IReferral>('Referral', ReferralSchema);