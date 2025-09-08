import { Schema, model, Document, Types, models } from 'mongoose';
import { addUidMiddleware } from '../helpers/uid-middleware';

interface IProxyService {
  type: string;
  name: string;
  cost: number;
  isEnabled: boolean;
  updatedBy?: Types.ObjectId;
  updatedAt?: Date;
}

export interface IProxy extends Document {
  id: number;
  uid: string;
  name: string;
  countryCode: string;
  services?: IProxyService[];
  currency: string;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

const ProxyServiceSchema = new Schema<IProxyService>({
  type: { type: String, required: true },
  name: { type: String, required: true },
  cost: { type: Number, required: true },
  isEnabled: { type: Boolean, default: true },
  updatedBy: { type: Schema.Types.ObjectId, ref: 'Admin' },
  updatedAt: { type: Date }
}, { _id: false });

const ProxySchema = new Schema<IProxy>({
  id: { type: Number, required: true, unique: true },
  uid: { type: String, unique: true },
  name: { type: String, required: true },
  countryCode: { type: String, required: true },
  services: [ProxyServiceSchema],
  currency: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
  deletedAt: { type: Date }
}, { 
  collection: 'proxies',
  timestamps: false
});

// Agregar middleware para generar uid desde _id
addUidMiddleware(ProxySchema);

export default (models.Proxy as any) || model<IProxy>('Proxy', ProxySchema);