import connectDB from '../mongodb';
import { userRepository } from '../repositories/user.repository';
import { accountRepository } from '../repositories/account.repository';
import { configRepository } from '../repositories/config.repository';

export class DatabaseService {
  private static instance: DatabaseService;

  private constructor() {}

  static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  }

  async connect(): Promise<void> {
    try {
      await connectDB();
      console.log('✅ Connected to MongoDB');
    } catch (error) {
      console.error('❌ MongoDB connection error:', error);
      throw error;
    }
  }

  get users() {
    return userRepository;
  }

  get accounts() {
    return accountRepository;
  }

  get config() {
    return configRepository;
  }

  async healthCheck(): Promise<{
    connected: boolean;
    database?: string;
    error?: string;
  }> {
    try {
      await connectDB();
      const mongoose = await import('mongoose');
      
      return {
        connected: mongoose.connection.readyState === 1,
        database: mongoose.connection.db?.databaseName
      };
    } catch (error) {
      return {
        connected: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  async createIndexes(): Promise<void> {
    try {
      await connectDB();
      console.log('✅ Database indexes created successfully');
    } catch (error) {
      console.error('❌ Error creating indexes:', error);
      throw error;
    }
  }

  async seed(): Promise<void> {
    try {
      await connectDB();
      
      const existingUsers = await userRepository.count({});
      
      if (existingUsers === 0) {
        const testUser = await userRepository.create({
          id: 1,
          uid: 'test-uid-001',
          email: 'test@fulldata.com',
          password: 'password123',
          firstName: 'Test',
          lastName: 'User',
          createdAt: Date.now()
        });

        const testAccount = await accountRepository.create({
          id: 1,
          name: 'Test Account',
          owner: testUser._id,
          users: [testUser._id],
          credits: 1000,
          level: 1,
          createdAt: Date.now()
        });

        await userRepository.update(testUser._id.toString(), {
          accounts: [testAccount._id]
        });

        console.log('✅ Database seeded with test data');
      } else {
        console.log('ℹ️ Database already contains data, skipping seed');
      }
    } catch (error) {
      console.error('❌ Error seeding database:', error);
      throw error;
    }
  }
}

export const db = DatabaseService.getInstance();