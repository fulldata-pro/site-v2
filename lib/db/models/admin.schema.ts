import { Schema, model, Document, Types, models } from 'mongoose';
import { addUidMiddleware } from '../helpers/uid-middleware';

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
  createdAt: Date;
  updatedBy?: Types.ObjectId;
  updatedAt?: Date;
  deletedBy?: Types.ObjectId;
  deletedAt?: Date;
}

const AdminSchema = new Schema<IAdmin>({
  id: { type: Number, required: true, unique: true },
  uid: { type: String, unique: true },
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
  createdAt: { type: Date, default: Date.now },
  updatedBy: { type: Schema.Types.ObjectId, ref: 'Admin' },
  updatedAt: { type: Date },
  deletedBy: { type: Schema.Types.ObjectId, ref: 'Admin' },
  deletedAt: { type: Date }
}, { 
  collection: 'admins',
  timestamps: false
});

// Agregar middleware para generar uid desde _id
addUidMiddleware(AdminSchema);

export default (models.Admin as any) || model<IAdmin>('Admin', AdminSchema);