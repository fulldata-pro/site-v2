import { Schema, model, Document, models } from 'mongoose';
import { addUidMiddleware } from '../helpers/uid-middleware';

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
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

const PaymentMethodSchema = new Schema<IPaymentMethod>({
  id: { type: Number, required: true, unique: true },
  uid: { type: String, unique: true },
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
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
  deletedAt: { type: Date }
}, { 
  collection: 'payment_methods',
  timestamps: false
});

// Agregar middleware para generar uid desde _id
addUidMiddleware(PaymentMethodSchema);

export default (models.PaymentMethod as any) || model<IPaymentMethod>('PaymentMethod', PaymentMethodSchema);