import { Schema, model, Document, Types, models } from 'mongoose';
import { addUidMiddleware } from '../helpers/uid-middleware';

interface IRequestRelation {
  request: Types.ObjectId;
  type: string;
}

export interface IRequest extends Document {
  id: number;
  uid: string;
  type: string;
  tag?: Types.ObjectId;
  countryCode: string;
  isDuplicated?: boolean;
  metadata?: object;
  prompts?: object;
  intelligenceData?: any;
  response?: string;
  error?: object;
  expiresAt?: Date;
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'expired';
  version?: string;
  relations?: IRequestRelation[];
  account: Types.ObjectId;
  user?: Types.ObjectId;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

const RequestRelationSchema = new Schema<IRequestRelation>({
  request: { type: Schema.Types.ObjectId, ref: 'Request', required: true },
  type: { type: String, required: true }
}, { _id: false });

const RequestSchema = new Schema<IRequest>({
  id: { type: Number, required: true, unique: true },
  uid: { type: String, unique: true },
  type: { type: String, required: true },
  tag: { type: Schema.Types.ObjectId, ref: 'AccountTag' },
  countryCode: { type: String, required: true },
  isDuplicated: { type: Boolean, default: false },
  metadata: { type: Object },
  prompts: { type: Object },
  intelligenceData: { type: Schema.Types.Mixed },
  response: { type: String },
  error: { type: Object },
  expiresAt: { type: Date },
  status: { 
    type: String, 
    enum: ['pending', 'processing', 'completed', 'failed', 'expired'],
    default: 'pending'
  },
  version: { type: String },
  relations: [RequestRelationSchema],
  account: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
  deletedAt: { type: Date }
}, { 
  collection: 'requests',
  timestamps: false
});

// Agregar middleware para generar uid desde _id
addUidMiddleware(RequestSchema);

export default (models.Request as any) || model<IRequest>('Request', RequestSchema);