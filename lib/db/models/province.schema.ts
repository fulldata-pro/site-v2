import { Schema, model, Document, Types, models } from 'mongoose';
import { addUidMiddleware } from '../helpers/uid-middleware';

export interface IProvince extends Document {
  id: number;
  uid: string;
  name: string;
  country: Types.ObjectId;
  createdAt: Date;
  updatedAt?: Date;
}

const ProvinceSchema = new Schema<IProvince>({
  id: { type: Number, required: true, unique: true },
  uid: { type: String, unique: true },
  name: { type: String, required: true },
  country: { type: Schema.Types.ObjectId, ref: 'Country', required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date }
}, { 
  collection: 'provinces',
  timestamps: false
});

// Agregar middleware para generar uid desde _id
addUidMiddleware(ProvinceSchema);

export default (models.Province as any) || model<IProvince>('Province', ProvinceSchema);