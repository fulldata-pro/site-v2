import { Schema, model, Document, Types } from 'mongoose';

export interface IProvince extends Document {
  id: number;
  uid: string;
  name: string;
  country: Types.ObjectId;
  createdAt: number;
  updatedAt?: number;
}

const ProvinceSchema = new Schema<IProvince>({
  id: { type: Number, required: true, unique: true },
  uid: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  country: { type: Schema.Types.ObjectId, ref: 'Country', required: true },
  createdAt: { type: Number, default: Date.now },
  updatedAt: { type: Number }
}, { 
  collection: 'provinces',
  timestamps: false
});

export default model<IProvince>('Province', ProvinceSchema);