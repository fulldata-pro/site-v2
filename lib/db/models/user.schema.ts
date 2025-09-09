import { Schema, model, Document, Types, models } from 'mongoose';
import { addUidMiddleware } from '../helpers/uid-middleware';

export interface IUser extends Document {
  id: number;
  uid: string;
  accounts: Types.ObjectId[];
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  phone?: string;
  phonePrefix?: string;
  googleId?: string;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

const UserSchema = new Schema<IUser>({
  id: { type: Number, required: true, unique: true },
  uid: { type: String, unique: true },
  accounts: [{ type: Schema.Types.ObjectId, ref: 'Account' }],
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  avatar: { type: String },
  phone: { type: String },
  phonePrefix: { type: String },
  googleId: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
  deletedAt: { type: Date }
}, { 
  collection: 'users',
  timestamps: false
});

// Agregar middleware para generar uid desde _id
addUidMiddleware(UserSchema);

export default (models.User as any) || model<IUser>('User', UserSchema);