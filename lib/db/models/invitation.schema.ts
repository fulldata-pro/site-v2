import { Schema, model, Document, Types, models } from 'mongoose';
import { addUidMiddleware } from '../helpers/uid-middleware';

export interface IInvitation extends Document {
  id: number;
  uid: string;
  account: Types.ObjectId;
  user?: Types.ObjectId;
  email: string;
  role: string;
  status: 'pending' | 'accepted' | 'rejected' | 'expired';
  createdBy?: Types.ObjectId;
  createdAt: Date;
  updatedAt?: Date;
  expiredAt?: Date;
  deletedAt?: Date;
}

const InvitationSchema = new Schema<IInvitation>({
  id: { type: Number, required: true, unique: true },
  uid: { type: String, unique: true },
  account: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  email: { type: String, required: true },
  role: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'accepted', 'rejected', 'expired'],
    default: 'pending'
  },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
  expiredAt: { type: Date },
  deletedAt: { type: Date }
}, { 
  collection: 'invitations',
  timestamps: false
});

// Agregar middleware para generar uid desde _id
addUidMiddleware(InvitationSchema);

export default (models.Invitation as any) || model<IInvitation>('Invitation', InvitationSchema);