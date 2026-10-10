import { connectDB, disconnectDB, ensureDefaultUser } from '../config/database';

const run = async () => {
  try {
    await connectDB();
    await ensureDefaultUser();
    await disconnectDB();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding user:', error);
    process.exit(1);
  }
};

run();
