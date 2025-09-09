import { Schema, model, Document, Types, models } from 'mongoose';
import { addUidMiddleware } from '../helpers/uid-middleware';

export interface IAccountTag extends Document {
  id: number;
  uid: string;
  name: string;
  type: string;
  account: Types.ObjectId;
  createdBy?: Types.ObjectId;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

const AccountTagSchema = new Schema<IAccountTag>({
  id: { type: Number, required: true, unique: true },
  uid: { type: String, unique: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
  account: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
  deletedAt: { type: Date }
}, { 
  collection: 'account_tags',
  timestamps: false
});

// Agregar middleware para generar uid desde _id
addUidMiddleware(AccountTagSchema);

export default (models.AccountTag as any) || model<IAccountTag>('AccountTag', AccountTagSchema);