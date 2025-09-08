import { Schema, model, Document, Types, models } from 'mongoose';
import { addUidMiddleware } from '../helpers/uid-middleware';

export interface IStatement extends Document {
  id: number;
  uid: string;
  data: object;
  file?: Types.ObjectId;
  account: Types.ObjectId;
  createdBy?: Types.ObjectId;
  updatedBy?: Types.ObjectId;
  createdAt: Date;
  updatedAt?: Date;
}

const StatementSchema = new Schema<IStatement>({
  id: { type: Number, required: true, unique: true },
  uid: { type: String, unique: true },
  data: { type: Object, required: true },
  file: { type: Schema.Types.ObjectId, ref: 'File' },
  account: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  updatedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date }
}, { 
  collection: 'statements',
  timestamps: false
});

// Agregar middleware para generar uid desde _id
addUidMiddleware(StatementSchema);

export default (models.Statement as any) || model<IStatement>('Statement', StatementSchema);