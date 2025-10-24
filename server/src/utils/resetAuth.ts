import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from '../models/User';
import bcrypt from 'bcryptjs';

// Load environment variables
dotenv.config({ path: 'server/.env' });

const MONGODB_URI = process.env.MONGODB_URI || '';

const resetAuth = async () => {
  try {
    console.log('🔄 Starting authentication reset...\n');

    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Delete all users
    const result = await User.deleteMany({});
    console.log(`🗑️  Deleted ${result.deletedCount} users from database`);

    // Create fresh admin user
    const hashedPassword = await bcrypt.hash('Admin@123', 10);
    const adminUser = new User({
      name: 'Admin User',
      email: 'admin@expense.com',
      password: hashedPassword,
    });

    await adminUser.save();
    console.log('✅ Created new admin user');
    console.log('   📧 Email: admin@expense.com');
    console.log('   🔑 Password: Admin@123\n');

    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('✅ Disconnected from MongoDB\n');
    
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('✨ Authentication reset complete!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log('📝 Next Steps:');
    console.log('   1. Clear browser localStorage:');
    console.log('      Open Console (F12) and run: localStorage.clear();');
    console.log('   2. Refresh the page');
    console.log('   3. Login with admin@expense.com / Admin@123');
    console.log('   4. OR create a new account via signup\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error resetting authentication:', error);
    process.exit(1);
  }
};

// Run the reset function
resetAuth();
