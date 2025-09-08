import { Schema, model, Document, Types, models } from 'mongoose';

interface IExchangeRate {
  currency: string;
  rate: number;
  updatedAt: number;
}

interface ICurrencyDiscount {
  paymentMethod: Types.ObjectId;
  percentage: number;
}

export interface ICurrency extends Document {
  id: number;
  uid: string;
  name: string;
  decimal: number;
  exchangeRate?: IExchangeRate[];
  discounts?: ICurrencyDiscount[];
  paymentMethod?: Types.ObjectId;
  createdAt: number;
  updatedAt?: number;
}

const ExchangeRateSchema = new Schema<IExchangeRate>({
  currency: { type: String, required: true },
  rate: { type: Number, required: true },
  updatedAt: { type: Number, default: Date.now }
}, { _id: false });

const CurrencyDiscountSchema = new Schema<ICurrencyDiscount>({
  paymentMethod: { type: Schema.Types.ObjectId, ref: 'PaymentMethod', required: true },
  percentage: { type: Number, required: true }
}, { _id: false });

const CurrencySchema = new Schema<ICurrency>({
  id: { type: Number, required: true, unique: true },
  uid: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  decimal: { type: Number, default: 2 },
  exchangeRate: [ExchangeRateSchema],
  discounts: [CurrencyDiscountSchema],
  paymentMethod: { type: Schema.Types.ObjectId, ref: 'PaymentMethod' },
  createdAt: { type: Number, default: Date.now },
  updatedAt: { type: Number }
}, { 
  collection: 'currencies',
  timestamps: false
});

export default (models.Currency as any) || model<ICurrency>('Currency', CurrencySchema);