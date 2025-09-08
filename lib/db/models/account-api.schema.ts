import { Schema, model, Document, Types, models } from 'mongoose';
import { addUidMiddleware } from '../helpers/uid-middleware';

export interface IAccountApi extends Document {
  id: number;
  uid: string;
  active: boolean;
  account: Types.ObjectId;
  apiKey: string;
  webhook?: string;
  createdBy?: Types.ObjectId;
  updatedBy?: Types.ObjectId;
  deletedBy?: Types.ObjectId;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

const AccountApiSchema = new Schema<IAccountApi>({
  id: { type: Number, required: true, unique: true },
  uid: { type: String, unique: true },
  active: { type: Boolean, default: true },
  account: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
  apiKey: { type: String, required: true, unique: true },
  webhook: { type: String },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  updatedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  deletedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
  deletedAt: { type: Date }
}, { 
  collection: 'account_apis',
  timestamps: false
});

// Agregar middleware para generar uid desde _id
addUidMiddleware(AccountApiSchema);

export default (models.AccountApi as any) || model<IAccountApi>('AccountApi', AccountApiSchema);