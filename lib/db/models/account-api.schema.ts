import { Schema, model, Document, Types, models } from 'mongoose';

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
  createdAt: number;
  updatedAt?: number;
  deletedAt?: number;
}

const AccountApiSchema = new Schema<IAccountApi>({
  id: { type: Number, required: true, unique: true },
  uid: { type: String, required: true, unique: true },
  active: { type: Boolean, default: true },
  account: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
  apiKey: { type: String, required: true, unique: true },
  webhook: { type: String },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  updatedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  deletedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Number, default: Date.now },
  updatedAt: { type: Number },
  deletedAt: { type: Number }
}, { 
  collection: 'account_apis',
  timestamps: false
});

export default (models.AccountApi as any) || model<IAccountApi>('AccountApi', AccountApiSchema);