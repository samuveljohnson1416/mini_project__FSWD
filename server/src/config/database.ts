import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MONGODB_URI, NODE_ENV } from './env';
import { User } from '../models/User';

let memoryServer: MongoMemoryServer | null = null;

export const ensureDefaultUser = async (): Promise<void> => {
  try {
    const adminEmail = 'admin@expense.com';
    const existing = await User.findOne({ email: adminEmail });

    if (!existing) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('Admin@123', salt);

      await User.create({
        name: 'Admin User',
        email: adminEmail,
        password: hashedPassword,
      });

      console.log('👤 Seeded default admin user:');
      console.log('   📧 Email: admin@expense.com');
      console.log('   🔑 Password: Admin@123');
    }
  } catch (err) {
    console.warn('⚠️  Could not verify or auto-seed admin user:', (err as Error).message);
  }
};

export const connectDB = async (): Promise<void> => {
  if (MONGODB_URI) {
    try {
      console.log('🔄 Connecting to MongoDB database...');
      await mongoose.connect(MONGODB_URI, {
        serverSelectionTimeoutMS: 5000,
      });
      console.log('✅ Connected to remote MongoDB database');
      return;
    } catch (error) {
      console.warn(`⚠️  Remote MongoDB connection failed: ${(error as Error).message}`);
      if (NODE_ENV === 'production') {
        throw error;
      }
      console.log('🔄 Falling back to embedded in-memory MongoDB for local development...');
    }
  }

  try {
    memoryServer = await MongoMemoryServer.create();
    const uri = memoryServer.getUri();
    await mongoose.connect(uri);
    console.log('✅ In-memory MongoDB connected successfully');
    console.log('💡 Note: Running with in-memory database. Data will be preserved during this server run.');
    console.log('💡 Tip: To connect to MongoDB Atlas, resume your Atlas cluster and update server/.env');
  } catch (memError) {
    console.error('❌ Failed to start in-memory MongoDB fallback:', memError);
    process.exit(1);
  }
};

export const disconnectDB = async (): Promise<void> => {
  try {
    await mongoose.disconnect();
    if (memoryServer) {
      await memoryServer.stop();
    }
    console.log('🛑 MongoDB disconnected');
  } catch (err) {
    console.error('Error during database disconnect:', err);
  }
};
