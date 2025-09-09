import { Schema, model, Document, models } from 'mongoose';
import { addUidMiddleware } from '../helpers/uid-middleware';

export interface ICountry extends Document {
  id: number;
  uid: string;
  name: string;
  alpha2Code: string;
  alpha3Code: string;
  callingCode: string;
  createdAt: Date;
  updatedAt?: Date;
}

const CountrySchema = new Schema<ICountry>({
  id: { type: Number, required: true, unique: true },
  uid: { type: String, unique: true },
  name: { type: String, required: true },
  alpha2Code: { type: String, required: true, unique: true },
  alpha3Code: { type: String, required: true, unique: true },
  callingCode: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date }
}, { 
  collection: 'countries',
  timestamps: false
});

// Agregar middleware para generar uid desde _id
addUidMiddleware(CountrySchema);

export default (models.Country as any) || model<ICountry>('Country', CountrySchema);