import bcrypt from 'bcryptjs';
import { connectDB, disconnectDB } from '../config/database';
import { User } from '../models/User';

const resetAuth = async () => {
  try {
    console.log('🔄 Starting authentication reset...\n');

    await connectDB();

    const result = await User.deleteMany({});
    console.log(`🗑️  Deleted ${result.deletedCount} users from database`);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('Admin@123', salt);
    const adminUser = new User({
      name: 'Admin User',
      email: 'admin@expense.com',
      password: hashedPassword,
    });

    await adminUser.save();
    console.log('✅ Created fresh admin user:');
    console.log('   📧 Email: admin@expense.com');
    console.log('   🔑 Password: Admin@123\n');

    await disconnectDB();

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('✨ Authentication reset complete!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log('📝 Next Steps:');
    console.log('   1. If your browser was logged in with a stale token, clear localStorage:');
    console.log('      Open Console (F12) and run: localStorage.clear();');
    console.log('   2. Login with admin@expense.com / Admin@123\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error resetting authentication:', error);
    process.exit(1);
  }
};

resetAuth();
