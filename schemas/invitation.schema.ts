import { Schema, model, Document, Types } from 'mongoose';

export interface IInvitation extends Document {
  id: number;
  uid: string;
  account: Types.ObjectId;
  user?: Types.ObjectId;
  email: string;
  role: string;
  status: 'pending' | 'accepted' | 'rejected' | 'expired';
  createdBy?: Types.ObjectId;
  createdAt: number;
  updatedAt?: number;
  expiredAt?: number;
  deletedAt?: number;
}

const InvitationSchema = new Schema<IInvitation>({
  id: { type: Number, required: true, unique: true },
  uid: { type: String, required: true, unique: true },
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
  createdAt: { type: Number, default: Date.now },
  updatedAt: { type: Number },
  expiredAt: { type: Number },
  deletedAt: { type: Number }
}, { 
  collection: 'invitations',
  timestamps: false
});

export default model<IInvitation>('Invitation', InvitationSchema);