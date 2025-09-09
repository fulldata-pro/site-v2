import { Schema, model, Document, Types, models } from 'mongoose';
import { addUidMiddleware } from '../helpers/uid-middleware';

interface IMovementSearch {
  proxy?: Types.ObjectId;
  type: string;
  status: string;
  cost: number;
  createdAt: Date;
}

export interface IMovement extends Document {
  id: number;
  uid: string;
  description: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  searches?: IMovementSearch[];
  request?: Types.ObjectId;
  receipt?: Types.ObjectId;
  account: Types.ObjectId;
  createdBy?: Types.ObjectId;
  createdAt: Date;
  updatedAt?: Date;
  expired?: boolean;
  expirationAt?: Date;
  deletedAt?: Date;
}

const MovementSearchSchema = new Schema<IMovementSearch>({
  proxy: { type: Schema.Types.ObjectId, ref: 'Proxy' },
  type: { type: String, required: true },
  status: { type: String, required: true },
  cost: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
}, { _id: false });

const MovementSchema = new Schema<IMovement>({
  id: { type: Number, required: true, unique: true },
  uid: { type: String, unique: true },
  description: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'processing', 'completed', 'failed'],
    default: 'pending'
  },
  searches: [MovementSearchSchema],
  request: { type: Schema.Types.ObjectId, ref: 'Request' },
  receipt: { type: Schema.Types.ObjectId, ref: 'Receipt' },
  account: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
  expired: { type: Boolean, default: false },
  expirationAt: { type: Date },
  deletedAt: { type: Date }
}, { 
  collection: 'movements',
  timestamps: false
});

// Agregar middleware para generar uid desde _id
addUidMiddleware(MovementSchema);

export default (models.Movement as any) || model<IMovement>('Movement', MovementSchema);