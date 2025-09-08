import { BaseRepository } from './base.repository';
import { IAccount } from '@/lib/db/models/account.schema';
import AccountSchema from '@/lib/db/models/account.schema';

class AccountRepository extends BaseRepository<IAccount> {
  constructor() {
    super(AccountSchema);
  }

  async findByName(name: string): Promise<IAccount | null> {
    await this.ensureConnection();
    return await this.model.findOne({ name }).exec();
  }

  async findByOwner(ownerId: string): Promise<IAccount[]> {
    await this.ensureConnection();
    return await this.model.find({ owner: ownerId }).exec();
  }

  async findWithUsers(accountId: string): Promise<IAccount | null> {
    await this.ensureConnection();
    return await this.model
      .findById(accountId)
      .populate('users')
      .populate('owner')
      .exec();
  }

  async findActiveAccounts(): Promise<IAccount[]> {
    await this.ensureConnection();
    return await this.model.find({ deletedAt: { $exists: false } }).exec();
  }

  async updateCredits(accountId: string, credits: number): Promise<IAccount | null> {
    await this.ensureConnection();
    return await this.model.findByIdAndUpdate(
      accountId,
      { credits, updatedAt: Date.now() },
      { new: true }
    ).exec();
  }

  async addCredits(accountId: string, amount: number): Promise<IAccount | null> {
    await this.ensureConnection();
    return await this.model.findByIdAndUpdate(
      accountId,
      { 
        $inc: { credits: amount },
        updatedAt: Date.now()
      },
      { new: true }
    ).exec();
  }

  async deductCredits(accountId: string, amount: number): Promise<IAccount | null> {
    await this.ensureConnection();
    return await this.model.findByIdAndUpdate(
      accountId,
      { 
        $inc: { credits: -amount },
        updatedAt: Date.now()
      },
      { new: true }
    ).exec();
  }

  async updateSavedSearch(accountId: string, savedSearch: any): Promise<IAccount | null> {
    await this.ensureConnection();
    return await this.model.findByIdAndUpdate(
      accountId,
      { savedSearch, updatedAt: Date.now() },
      { new: true }
    ).exec();
  }

  async updateSettings(accountId: string, settings: any): Promise<IAccount | null> {
    await this.ensureConnection();
    return await this.model.findByIdAndUpdate(
      accountId,
      { settings, updatedAt: Date.now() },
      { new: true }
    ).exec();
  }

  async softDelete(accountId: string): Promise<IAccount | null> {
    await this.ensureConnection();
    return await this.model.findByIdAndUpdate(
      accountId,
      { deletedAt: Date.now() },
      { new: true }
    ).exec();
  }

  async restore(accountId: string): Promise<IAccount | null> {
    await this.ensureConnection();
    return await this.model.findByIdAndUpdate(
      accountId,
      { $unset: { deletedAt: 1 } },
      { new: true }
    ).exec();
  }
}

export const accountRepository = new AccountRepository();