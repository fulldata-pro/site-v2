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
      const bcrypt = await import('bcryptjs');
      
      const existingUsers = await userRepository.count({});
      
      if (existingUsers === 0) {
        // Hash passwords
        const adminPassword = await bcrypt.hash('admin123', 12);
        const userPassword = await bcrypt.hash('user123', 12);

        // Create admin user
        const adminUser = await userRepository.create({
          id: 1,
          uid: 'admin-uid-001',
          email: 'admin@fulldata.com',
          password: adminPassword,
          firstName: 'Admin',
          lastName: 'User',
          createdAt: Date.now()
        });

        // Create regular user
        const testUser = await userRepository.create({
          id: 2,
          uid: 'user-uid-001',
          email: 'user@fulldata.com',
          password: userPassword,
          firstName: 'Test',
          lastName: 'User',
          createdAt: Date.now()
        });

        // Create admin account
        const adminAccount = await accountRepository.create({
          id: 1,
          uid: 'account-admin-001',
          name: 'Admin Account',
          email: 'admin@fulldata.com',
          type: 'business',
          status: 'active',
          users: [{ user: adminUser._id as any, role: 'owner', addedAt: Date.now() }],
          createdAt: Date.now()
        });

        // Create test account
        const testAccount = await accountRepository.create({
          id: 2,
          uid: 'account-user-001',
          name: 'Test Account',
          email: 'user@fulldata.com',
          type: 'individual',
          status: 'active',
          users: [{ user: testUser._id as any, role: 'owner', addedAt: Date.now() }],
          createdAt: Date.now()
        });

        // Update users with account references
        await userRepository.update(String(adminUser._id), {
          accounts: [adminAccount._id]
        });

        await userRepository.update(String(testUser._id), {
          accounts: [testAccount._id]
        });

        console.log('✅ Database seeded with test data:');
        console.log('📧 Admin: admin@fulldata.com / admin123');
        console.log('👤 User: user@fulldata.com / user123');
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