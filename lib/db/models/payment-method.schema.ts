import { Schema, model, Document, models } from 'mongoose';

export interface IPaymentMethod extends Document {
  id: number;
  uid: string;
  type: 'credit_card' | 'debit_card' | 'bank_transfer' | 'crypto' | 'paypal' | 'other';
  name: string;
  description?: string;
  icon?: string;
  color?: string;
  credentials?: object;
  isEnabled: boolean;
  createdAt: number;
  updatedAt?: number;
  deletedAt?: number;
}

const PaymentMethodSchema = new Schema<IPaymentMethod>({
  id: { type: Number, required: true, unique: true },
  uid: { type: String, required: true, unique: true },
  type: { 
    type: String, 
    enum: ['credit_card', 'debit_card', 'bank_transfer', 'crypto', 'paypal', 'other'],
    required: true 
  },
  name: { type: String, required: true },
  description: { type: String },
  icon: { type: String },
  color: { type: String },
  credentials: { type: Object },
  isEnabled: { type: Boolean, default: true },
  createdAt: { type: Number, default: Date.now },
  updatedAt: { type: Number },
  deletedAt: { type: Number }
}, { 
  collection: 'payment_methods',
  timestamps: false
});

export default (models.PaymentMethod as any) || model<IPaymentMethod>('PaymentMethod', PaymentMethodSchema);