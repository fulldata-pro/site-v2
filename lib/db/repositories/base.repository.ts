import { Model, Document, FilterQuery, UpdateQuery, QueryOptions } from 'mongoose';
import connectDB from '../mongodb';

export abstract class BaseRepository<T extends Document> {
  protected model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async ensureConnection() {
    await connectDB();
  }

  async create(data: Partial<T>): Promise<T> {
    await this.ensureConnection();
    const document = new this.model(data);
    return await document.save();
  }

  async findById(id: string): Promise<T | null> {
    await this.ensureConnection();
    return await this.model.findById(id).exec();
  }

  async findOne(filter: FilterQuery<T>): Promise<T | null> {
    await this.ensureConnection();
    return await this.model.findOne(filter).exec();
  }

  async find(filter: FilterQuery<T> = {}, options: QueryOptions = {}): Promise<T[]> {
    await this.ensureConnection();
    return await this.model.find(filter, null, options).exec();
  }

  async update(id: string, update: UpdateQuery<T>): Promise<T | null> {
    await this.ensureConnection();
    return await this.model.findByIdAndUpdate(id, update, { new: true }).exec();
  }

  async updateMany(filter: FilterQuery<T>, update: UpdateQuery<T>): Promise<any> {
    await this.ensureConnection();
    return await this.model.updateMany(filter, update).exec();
  }

  async delete(id: string): Promise<T | null> {
    await this.ensureConnection();
    return await this.model.findByIdAndDelete(id).exec();
  }

  async deleteMany(filter: FilterQuery<T>): Promise<any> {
    await this.ensureConnection();
    return await this.model.deleteMany(filter).exec();
  }

  async count(filter: FilterQuery<T> = {}): Promise<number> {
    await this.ensureConnection();
    return await this.model.countDocuments(filter).exec();
  }

  async exists(filter: FilterQuery<T>): Promise<boolean> {
    await this.ensureConnection();
    const count = await this.model.countDocuments(filter).exec();
    return count > 0;
  }

  async paginate(
    filter: FilterQuery<T> = {},
    page: number = 1,
    limit: number = 10,
    sort: any = { createdAt: -1 }
  ): Promise<{
    data: T[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    await this.ensureConnection();
    const skip = (page - 1) * limit;
    
    const [data, total] = await Promise.all([
      this.model.find(filter).sort(sort).skip(skip).limit(limit).exec(),
      this.model.countDocuments(filter).exec()
    ]);

    return {
      data,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    };
  }
}