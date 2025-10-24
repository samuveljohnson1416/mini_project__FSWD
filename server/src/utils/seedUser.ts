import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { User } from '../models/User';

// Load environment variables
dotenv.config({ path: 'server/.env' });

const MONGODB_URI = process.env.MONGODB_URI || '';

// Default admin user credentials
const DEFAULT_USER = {
  name: 'Admin User',
  email: 'admin@expense.com',
  password: 'Admin@123', // This will be hashed
};

const seedUser = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Check if user already exists
    const existingUser = await User.findOne({ email: DEFAULT_USER.email });
    
    if (existingUser) {
      console.log('⚠️  Default user already exists!');
      console.log('📧 Email:', DEFAULT_USER.email);
      console.log('🔑 Password: Admin@123');
      await mongoose.disconnect();
      return;
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(DEFAULT_USER.password, salt);

    // Create the user
    const user = new User({
      name: DEFAULT_USER.name,
      email: DEFAULT_USER.email,
      password: hashedPassword,
    });

    await user.save();

    console.log('✅ Default user created successfully!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📧 Email: admin@expense.com');
    console.log('🔑 Password: Admin@123');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('👉 You can now login with these credentials!');

    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('✅ Disconnected from MongoDB');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding user:', error);
    process.exit(1);
  }
};

// Run the seed function
seedUser();
