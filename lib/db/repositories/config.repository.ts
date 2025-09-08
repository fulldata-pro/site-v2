import { BaseRepository } from './base.repository';
import { IConfig } from '@/lib/db/models/config.schema';
import ConfigSchema from '@/lib/db/models/config.schema';

class ConfigRepository extends BaseRepository<IConfig> {
  constructor() {
    super(ConfigSchema);
  }

  async getConfig(): Promise<IConfig | null> {
    await this.ensureConnection();
    const config = await this.model.findOne().exec();
    
    if (!config) {
      // Create default config if it doesn't exist
      return await this.create({
        searches: {
          expirations: {
            time: 90,
            isEnabled: true
          }
        },
        referrals: {
          account: {
            isEnabled: true,
            type: 'percentage',
            amount: 0.05,
            maxAmount: 25
          },
          referred: {
            isEnabled: true,
            type: 'amount',
            amount: 25,
            maxAmount: 0
          },
          limits: {
            referrals: 2,
            referred: 0
          },
          minAmount: 10
        },
        benefit: {
          firstPurchase: {
            isEnabled: true,
            type: 'percentage',
            amount: 0.05,
            maxAmount: 50
          }
        }
      });
    }
    
    return config;
  }

  async updateSearchConfig(expirations: { time: number; isEnabled: boolean }): Promise<IConfig | null> {
    await this.ensureConnection();
    const config = await this.getConfig();
    
    if (config) {
      return await this.model.findByIdAndUpdate(
        config._id,
        { 'searches.expirations': expirations },
        { new: true }
      ).exec();
    }
    
    return null;
  }

  async updateReferralConfig(referrals: any): Promise<IConfig | null> {
    await this.ensureConnection();
    const config = await this.getConfig();
    
    if (config) {
      return await this.model.findByIdAndUpdate(
        config._id,
        { referrals },
        { new: true }
      ).exec();
    }
    
    return null;
  }

  async updateBenefitConfig(benefit: any): Promise<IConfig | null> {
    await this.ensureConnection();
    const config = await this.getConfig();
    
    if (config) {
      return await this.model.findByIdAndUpdate(
        config._id,
        { benefit },
        { new: true }
      ).exec();
    }
    
    return null;
  }

  async getReferralLimits(): Promise<{ referrals: number; referred: number } | null> {
    await this.ensureConnection();
    const config = await this.getConfig();
    
    if (config) {
      return config.referrals.limits;
    }
    
    return null;
  }

  async getSearchExpirationTime(): Promise<number> {
    await this.ensureConnection();
    const config = await this.getConfig();
    
    if (config && config.searches.expirations.isEnabled) {
      return config.searches.expirations.time;
    }
    
    return 90; // Default value
  }

  async isFirstPurchaseBenefitEnabled(): Promise<boolean> {
    await this.ensureConnection();
    const config = await this.getConfig();
    
    if (config) {
      return config.benefit.firstPurchase.isEnabled;
    }
    
    return true; // Default value
  }
}

export const configRepository = new ConfigRepository();