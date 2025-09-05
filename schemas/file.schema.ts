import { Schema, model, Document } from 'mongoose';

export interface IFile extends Document {
  id: number;
  uid: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  urlView?: string;
  urlDownload?: string;
  storageKey: string;
  createdAt: number;
  updatedAt?: number;
  deletedAt?: number;
}

const FileSchema = new Schema<IFile>({
  id: { type: Number, required: true, unique: true },
  uid: { type: String, required: true, unique: true },
  fileName: { type: String, required: true },
  fileSize: { type: Number, required: true },
  fileType: { type: String, required: true },
  urlView: { type: String },
  urlDownload: { type: String },
  storageKey: { type: String, required: true },
  createdAt: { type: Number, default: Date.now },
  updatedAt: { type: Number },
  deletedAt: { type: Number }
}, { 
  collection: 'files',
  timestamps: false
});

export default model<IFile>('File', FileSchema);