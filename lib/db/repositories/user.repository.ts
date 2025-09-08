import { BaseRepository } from './base.repository';
import { IUser } from '@/lib/db/models/user.schema';
import UserSchema from '@/lib/db/models/user.schema';

class UserRepository extends BaseRepository<IUser> {
  constructor() {
    super(UserSchema);
  }

  async findByEmail(email: string): Promise<IUser | null> {
    await this.ensureConnection();
    return await this.model.findOne({ email }).exec();
  }

  async findByUid(uid: string): Promise<IUser | null> {
    await this.ensureConnection();
    return await this.model.findOne({ uid }).exec();
  }

  async findWithAccounts(userId: string): Promise<IUser | null> {
    await this.ensureConnection();
    return await this.model
      .findById(userId)
      .populate('accounts')
      .exec();
  }

  async authenticate(email: string, password: string): Promise<IUser | null> {
    await this.ensureConnection();
    return await this.model.findOne({ email, password }).exec();
  }

  async updateLastLogin(userId: string): Promise<IUser | null> {
    await this.ensureConnection();
    return await this.model.findByIdAndUpdate(
      userId,
      { updatedAt: Date.now() },
      { new: true }
    ).exec();
  }

  async softDelete(userId: string): Promise<IUser | null> {
    await this.ensureConnection();
    return await this.model.findByIdAndUpdate(
      userId,
      { deletedAt: Date.now() },
      { new: true }
    ).exec();
  }

  async restore(userId: string): Promise<IUser | null> {
    await this.ensureConnection();
    return await this.model.findByIdAndUpdate(
      userId,
      { $unset: { deletedAt: 1 } },
      { new: true }
    ).exec();
  }
}

export const userRepository = new UserRepository();