import { Schema, model, Document } from 'mongoose';

export interface IConfig extends Document {
  searches: {
    expirations: {
      time: number;
      isEnabled: boolean;
    };
  };
  referrals: {
    account: {
      isEnabled: boolean;
      type: 'percentage' | 'amount';
      amount: number;
      maxAmount: number;
    };
    referred: {
      isEnabled: boolean;
      type: 'percentage' | 'amount';
      amount: number;
      maxAmount: number;
    };
    limits: {
      referrals: number;
      referred: number;
    };
    minAmount: number;
  };
  benefit: {
    firstPurchase: {
      isEnabled: boolean;
      type: 'percentage' | 'amount';
      amount: number;
      maxAmount: number;
    };
  };
  createdAt: Date;
  updatedAt: Date;
}

const ConfigSchema = new Schema<IConfig>({
  searches: {
    expirations: {
      time: { type: Number, default: 90 },
      isEnabled: { type: Boolean, default: true }
    }
  },
  referrals: {
    account: {
      isEnabled: { type: Boolean, default: true },
      type: { type: String, enum: ['percentage', 'amount'], default: 'percentage' },
      amount: { type: Number, default: 0.05 },
      maxAmount: { type: Number, default: 25 }
    },
    referred: {
      isEnabled: { type: Boolean, default: true },
      type: { type: String, enum: ['percentage', 'amount'], default: 'amount' },
      amount: { type: Number, default: 25 },
      maxAmount: { type: Number, default: 0 }
    },
    limits: {
      referrals: { type: Number, default: 2 },
      referred: { type: Number, default: 0 }
    },
    minAmount: { type: Number, default: 10 }
  },
  benefit: {
    firstPurchase: {
      isEnabled: { type: Boolean, default: true },
      type: { type: String, enum: ['percentage', 'amount'], default: 'percentage' },
      amount: { type: Number, default: 0.05 },
      maxAmount: { type: Number, default: 50 }
    }
  }
}, {
  collection: 'config',
  timestamps: true
});

export default model<IConfig>('Config', ConfigSchema);