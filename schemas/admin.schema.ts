import { Schema, model, Document, Types } from 'mongoose';

export interface IAdmin extends Document {
  id: number;
  uid: string;
  name: string;
  avatar?: string;
  phone?: string;
  email: string;
  password: string;
  status: 'active' | 'inactive' | 'suspended';
  role: 'super_admin' | 'admin' | 'moderator';
  createdBy?: Types.ObjectId;
  createdAt: number;
  updatedBy?: Types.ObjectId;
  updatedAt?: number;
  deletedBy?: Types.ObjectId;
  deletedAt?: number;
}

const AdminSchema = new Schema<IAdmin>({
  id: { type: Number, required: true, unique: true },
  uid: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  avatar: { type: String },
  phone: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['active', 'inactive', 'suspended'],
    default: 'active'
  },
  role: { 
    type: String, 
    enum: ['super_admin', 'admin', 'moderator'],
    required: true 
  },
  createdBy: { type: Schema.Types.ObjectId, ref: 'Admin' },
  createdAt: { type: Number, default: Date.now },
  updatedBy: { type: Schema.Types.ObjectId, ref: 'Admin' },
  updatedAt: { type: Number },
  deletedBy: { type: Schema.Types.ObjectId, ref: 'Admin' },
  deletedAt: { type: Number }
}, { 
  collection: 'admins',
  timestamps: false
});

export default model<IAdmin>('Admin', AdminSchema);