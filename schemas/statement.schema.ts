import { Schema, model, Document, Types } from 'mongoose';

export interface IStatement extends Document {
  id: number;
  uid: string;
  data: object;
  file?: Types.ObjectId;
  account: Types.ObjectId;
  createdBy?: Types.ObjectId;
  updatedBy?: Types.ObjectId;
  createdAt: number;
  updatedAt?: number;
}

const StatementSchema = new Schema<IStatement>({
  id: { type: Number, required: true, unique: true },
  uid: { type: String, required: true, unique: true },
  data: { type: Object, required: true },
  file: { type: Schema.Types.ObjectId, ref: 'File' },
  account: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  updatedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Number, default: Date.now },
  updatedAt: { type: Number }
}, { 
  collection: 'statements',
  timestamps: false
});

export default model<IStatement>('Statement', StatementSchema);