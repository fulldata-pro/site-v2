import { Schema, model, Document, Types } from 'mongoose';

export interface IReferral extends Document {
  id: number;
  uid: string;
  type: 'credit' | 'debit';
  amount: number;
  balance: number;
  account: Types.ObjectId;
  referred?: Types.ObjectId;
  receipt?: Types.ObjectId;
  createdAt: number;
  updatedAt?: number;
  deletedAt?: number;
}

const ReferralSchema = new Schema<IReferral>({
  id: { type: Number, required: true, unique: true },
  uid: { type: String, required: true, unique: true },
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
  createdAt: { type: Number, default: Date.now },
  updatedAt: { type: Number },
  deletedAt: { type: Number }
}, { 
  collection: 'referrals',
  timestamps: false
});

export default model<IReferral>('Referral', ReferralSchema);