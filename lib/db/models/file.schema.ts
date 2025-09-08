import { Schema, model, Document, models } from 'mongoose';
import { addUidMiddleware } from '../helpers/uid-middleware';

export interface IFile extends Document {
  id: number;
  uid: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  urlView?: string;
  urlDownload?: string;
  storageKey: string;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

const FileSchema = new Schema<IFile>({
  id: { type: Number, required: true, unique: true },
  uid: { type: String, unique: true },
  fileName: { type: String, required: true },
  fileSize: { type: Number, required: true },
  fileType: { type: String, required: true },
  urlView: { type: String },
  urlDownload: { type: String },
  storageKey: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
  deletedAt: { type: Date }
}, { 
  collection: 'files',
  timestamps: false
});

// Agregar middleware para generar uid desde _id
addUidMiddleware(FileSchema);

export default (models.File as any) || model<IFile>('File', FileSchema);