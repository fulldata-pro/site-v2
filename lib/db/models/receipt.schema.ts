import { Schema, model, Document, Types } from 'mongoose';

interface IReceiptExtra {
  description: string;
  amount: number;
}

interface IReceiptDiscount {
  type: string;
  amount: number;
  code?: string;
}

interface IReceiptSearches {
  searchId: Types.ObjectId;
  type: string;
  cost: number;
}

export interface IReceipt extends Document {
  id: number;
  uid: string;
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded';
  statusMessage?: string;
  amount: number;
  total: number;
  totalUSD: number;
  subtotal: number;
  subtotalUSD: number;
  currency: string;
  exchangeRate: number;
  extra?: IReceiptExtra[];
  discount?: IReceiptDiscount;
  searches?: IReceiptSearches[];
  paymentMethod?: Types.ObjectId;
  transactionId?: string;
  transactionUrl?: string;
  benefit?: Types.ObjectId;
  account: Types.ObjectId;
  statement?: Types.ObjectId;
  createdBy?: Types.ObjectId;
  createdAt: number;
  updatedAt?: number;
  expiredAt?: number;
  deletedAt?: number;
}

const ReceiptExtraSchema = new Schema<IReceiptExtra>({
  description: { type: String, required: true },
  amount: { type: Number, required: true }
}, { _id: false });

const ReceiptDiscountSchema = new Schema<IReceiptDiscount>({
  type: { type: String, required: true },
  amount: { type: Number, required: true },
  code: { type: String }
}, { _id: false });

const ReceiptSearchesSchema = new Schema<IReceiptSearches>({
  searchId: { type: Schema.Types.ObjectId, required: true },
  type: { type: String, required: true },
  cost: { type: Number, required: true }
}, { _id: false });

const ReceiptSchema = new Schema<IReceipt>({
  id: { type: Number, required: true, unique: true },
  uid: { type: String, required: true, unique: true },
  status: { 
    type: String, 
    enum: ['pending', 'processing', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  statusMessage: { type: String },
  amount: { type: Number, required: true },
  total: { type: Number, required: true },
  totalUSD: { type: Number, required: true },
  subtotal: { type: Number, required: true },
  subtotalUSD: { type: Number, required: true },
  currency: { type: String, required: true },
  exchangeRate: { type: Number, required: true },
  extra: [ReceiptExtraSchema],
  discount: ReceiptDiscountSchema,
  searches: [ReceiptSearchesSchema],
  paymentMethod: { type: Schema.Types.ObjectId, ref: 'PaymentMethod' },
  transactionId: { type: String },
  transactionUrl: { type: String },
  benefit: { type: Schema.Types.ObjectId, ref: 'Benefit' },
  account: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
  statement: { type: Schema.Types.ObjectId, ref: 'Statement' },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Number, default: Date.now },
  updatedAt: { type: Number },
  expiredAt: { type: Number },
  deletedAt: { type: Number }
}, { 
  collection: 'receipts',
  timestamps: false
});

export default model<IReceipt>('Receipt', ReceiptSchema);