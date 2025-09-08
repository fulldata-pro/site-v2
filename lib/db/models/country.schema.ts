import { Schema, model, Document, models } from 'mongoose';

export interface ICountry extends Document {
  id: number;
  uid: string;
  name: string;
  alpha2Code: string;
  alpha3Code: string;
  callingCode: string;
  createdAt: number;
  updatedAt?: number;
}

const CountrySchema = new Schema<ICountry>({
  id: { type: Number, required: true, unique: true },
  uid: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  alpha2Code: { type: String, required: true, unique: true },
  alpha3Code: { type: String, required: true, unique: true },
  callingCode: { type: String, required: true },
  createdAt: { type: Number, default: Date.now },
  updatedAt: { type: Number }
}, { 
  collection: 'countries',
  timestamps: false
});

export default (models.Country as any) || model<ICountry>('Country', CountrySchema);