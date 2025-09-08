import { Schema, model, Document, Types } from 'mongoose';

interface IMovementSearch {
  proxy?: Types.ObjectId;
  type: string;
  status: string;
  cost: number;
  createdAt: number;
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
  createdAt: number;
  updatedAt?: number;
  expired?: boolean;
  expirationAt?: number;
  deletedAt?: number;
}

const MovementSearchSchema = new Schema<IMovementSearch>({
  proxy: { type: Schema.Types.ObjectId, ref: 'Proxy' },
  type: { type: String, required: true },
  status: { type: String, required: true },
  cost: { type: Number, required: true },
  createdAt: { type: Number, default: Date.now }
}, { _id: false });

const MovementSchema = new Schema<IMovement>({
  id: { type: Number, required: true, unique: true },
  uid: { type: String, required: true, unique: true },
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
  createdAt: { type: Number, default: Date.now },
  updatedAt: { type: Number },
  expired: { type: Boolean, default: false },
  expirationAt: { type: Number },
  deletedAt: { type: Number }
}, { 
  collection: 'movements',
  timestamps: false
});

export default model<IMovement>('Movement', MovementSchema);