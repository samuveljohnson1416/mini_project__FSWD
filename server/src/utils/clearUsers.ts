import { connectDB, disconnectDB } from '../config/database';
import { User } from '../models/User';

const clearUsers = async () => {
  try {
    await connectDB();
    const result = await User.deleteMany({});
    console.log(`🗑️  Deleted ${result.deletedCount} users from database`);
    await disconnectDB();
    console.log('✨ All users have been cleared!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error clearing users:', error);
    process.exit(1);
  }
};

clearUsers();
