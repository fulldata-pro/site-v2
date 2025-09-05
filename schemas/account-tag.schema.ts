import { Schema, model, Document, Types } from 'mongoose';

export interface IAccountTag extends Document {
  id: number;
  uid: string;
  name: string;
  type: string;
  account: Types.ObjectId;
  createdBy?: Types.ObjectId;
  createdAt: number;
  updatedAt?: number;
  deletedAt?: number;
}

const AccountTagSchema = new Schema<IAccountTag>({
  id: { type: Number, required: true, unique: true },
  uid: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
  account: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Number, default: Date.now },
  updatedAt: { type: Number },
  deletedAt: { type: Number }
}, { 
  collection: 'account_tags',
  timestamps: false
});

export default model<IAccountTag>('AccountTag', AccountTagSchema);