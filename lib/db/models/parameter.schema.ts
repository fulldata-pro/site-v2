import { Schema, model, Document, Types, models } from 'mongoose';

interface IParameterName {
  id: string;
  name: string;
}

interface ISalarySchema {
  min: number;
  max: number;
  label: string;
}

export interface IParameter extends Document {
  id: number;
  uid: string;
  country: Types.ObjectId;
  activities?: IParameterName[];
  incomeTaxType?: IParameterName[];
  salaryRange?: ISalarySchema[];
  vatType?: IParameterName[];
}

const ParameterNameSchema = new Schema<IParameterName>({
  id: { type: String, required: true },
  name: { type: String, required: true }
}, { _id: false });

const SalarySchema = new Schema<ISalarySchema>({
  min: { type: Number, required: true },
  max: { type: Number, required: true },
  label: { type: String, required: true }
}, { _id: false });

const ParameterSchema = new Schema<IParameter>({
  id: { type: Number, required: true, unique: true },
  uid: { type: String, required: true, unique: true },
  country: { type: Schema.Types.ObjectId, ref: 'Country', required: true },
  activities: [ParameterNameSchema],
  incomeTaxType: [ParameterNameSchema],
  salaryRange: [SalarySchema],
  vatType: [ParameterNameSchema]
}, { 
  collection: 'parameters',
  timestamps: false
});

export default (models.Parameter as any) || model<IParameter>('Parameter', ParameterSchema);