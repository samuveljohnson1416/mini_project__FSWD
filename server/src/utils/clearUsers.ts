import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from '../models/User';

// Load environment variables
dotenv.config({ path: 'server/.env' });

const MONGODB_URI = process.env.MONGODB_URI || '';

const clearUsers = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Delete all users
    const result = await User.deleteMany({});
    console.log(`🗑️  Deleted ${result.deletedCount} users`);

    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('✅ Disconnected from MongoDB');
    console.log('');
    console.log('✨ All users have been cleared!');
    console.log('💡 You can now create a new account with signup');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error clearing users:', error);
    process.exit(1);
  }
};

// Run the clear function
clearUsers();
