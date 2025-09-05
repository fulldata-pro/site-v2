import { Schema, model, Document, Types } from 'mongoose';

interface IProxyService {
  type: string;
  name: string;
  cost: number;
  isEnabled: boolean;
  updatedBy?: Types.ObjectId;
  updatedAt?: number;
}

export interface IProxy extends Document {
  id: number;
  uid: string;
  name: string;
  countryCode: string;
  services?: IProxyService[];
  currency: string;
  createdAt: number;
  updatedAt?: number;
  deletedAt?: number;
}

const ProxyServiceSchema = new Schema<IProxyService>({
  type: { type: String, required: true },
  name: { type: String, required: true },
  cost: { type: Number, required: true },
  isEnabled: { type: Boolean, default: true },
  updatedBy: { type: Schema.Types.ObjectId, ref: 'Admin' },
  updatedAt: { type: Number }
}, { _id: false });

const ProxySchema = new Schema<IProxy>({
  id: { type: Number, required: true, unique: true },
  uid: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  countryCode: { type: String, required: true },
  services: [ProxyServiceSchema],
  currency: { type: String, required: true },
  createdAt: { type: Number, default: Date.now },
  updatedAt: { type: Number },
  deletedAt: { type: Number }
}, { 
  collection: 'proxies',
  timestamps: false
});

export default model<IProxy>('Proxy', ProxySchema);